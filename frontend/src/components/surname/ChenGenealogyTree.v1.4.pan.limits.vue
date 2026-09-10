<template>
  <div class="genealogy-tree-container">
    <div class="tree-header">
      <h3 class="tree-title">陈氏家谱测试</h3>
      <div class="tree-controls">
        <button class="ctrl-btn" @click="expandAll">展开全部</button>
        <button class="ctrl-btn" @click="collapseAll">折叠全部</button>
        <button class="ctrl-btn" @click="resetView">重置视图</button>
        <button class="ctrl-btn" @click="zoomOut" :disabled="scale <= MIN_SCALE">−</button>
        <button class="ctrl-btn" @click="zoomIn" :disabled="scale >= MAX_SCALE">+</button>
        <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
      </div>
    </div>
    
    <div
      class="tree-viewport"
      ref="viewportRef"
      :style="{ overflow: (needVerticalScroll || needHorizontalScroll || panX !== 0 || panY !== 0) ? 'auto' : 'hidden', cursor: isPanning ? 'grabbing' : 'grab' }"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
      @wheel.prevent="onWheel"
    >
      <div 
        class="tree-scale-wrapper" 
        :style="{ 
          transform: `scale(${scale}) translate(${panX / scale}px, ${panY / scale}px)`, 
          transformOrigin: 'top left',
          userSelect: 'none'
        }"
      >
      <svg
        class="tree-svg"
        :width="svgWidth"
        :height="svgHeight"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        preserveAspectRatio="xMinYMin meet"
      >
        <!-- 连接线 -->
        <g class="edges">
          <path
            v-for="edge in visibleEdges"
            :key="edge.id"
            :d="edge.path"
            class="edge-line"
          />
        </g>
        
        <!-- 节点 -->
        <g class="nodes">
          <foreignObject
            v-for="node in visibleNodes"
            :key="node.id"
            :x="node.x"
            :y="node.y"
            :width="NODE_WIDTH"
            :height="NODE_HEIGHT"
            class="node-foreign"
          >
            <div 
              class="node-card" 
              :class="{ selected: selectedNode?.id === node.id }"
              @click="selectNode(node)"
            >
              <div class="node-avatar">
                {{ node.gender === 'male' ? '👤' : '👩' }}
              </div>
              <div class="node-name">{{ node.name }}</div>
              <div class="node-gen">第{{ node.generation }}代</div>
              <button 
                v-if="hasChildren(node.id)"
                class="toggle-btn"
                @click.stop="toggleNode(node.id)"
              >
                {{ collapsedNodes.has(node.id) ? '+' : '-' }}
              </button>
            </div>
          </foreignObject>
        </g>
      </svg>
      </div>
    </div>
    
    <!-- 节点详情 -->
    <div v-if="selectedNode" class="node-detail">
      <div class="detail-header">
        <span class="detail-name">{{ selectedNode.name }}</span>
        <button class="close-btn" @click="selectedNode = null">×</button>
      </div>
      <div class="detail-info">
        <p>性别: {{ selectedNode.gender === 'male' ? '男' : '女' }}</p>
        <p>世代: 第{{ selectedNode.generation }}代</p>
        <p>出生: {{ selectedNode.birthYear }}年</p>
      </div>
      <div class="detail-relations">
        <div v-if="selectedParent" class="relation">
          <strong>父亲:</strong> {{ selectedParent.name }}
        </div>
        <div v-if="selectedChildren.length > 0" class="relation">
          <strong>子女:</strong> {{ selectedChildren.map(c => c.name).join('、') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  chenGenealogyPersons, 
  chenGenealogyRelationships,
  getChildren,
  getParent 
} from '@/data/chenGenealogyTest'

// 配置
const NODE_WIDTH = 100
const NODE_HEIGHT = 70
const HORIZONTAL_GAP = 20
const VERTICAL_GAP = 100
const VIEWPORT_WIDTH = 1200 // 固定视图宽度

// 缩放状态
const scale = ref(1)
const MIN_SCALE = 0.3
const MAX_SCALE = 3

// 平移状态
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const startX = ref(0)
const startY = ref(0)

// 状态
const collapsedNodes = ref(new Set<string>())
const selectedNode = ref<any>(null)
const viewportRef = ref<HTMLElement | null>(null)

// 计算可见节点（带位置）
const visibleNodes = computed(() => {
  // 先计算完整布局
  const layoutMap = calculateLayout()
  
  const nodes = new Map<string, any>()
  
  // 构建父子关系
  const childrenMap = new Map<string, string[]>()
  
  chenGenealogyRelationships.forEach(rel => {
    if (!childrenMap.has(rel.parentId)) {
      childrenMap.set(rel.parentId, [])
    }
    childrenMap.get(rel.parentId)!.push(rel.childId)
  })
  
  // 找到根节点
  const rootId = 'p1'
  
  // 收集可见节点（带位置）
  function collectVisible(nodeId: string) {
    const layoutNode = layoutMap.get(nodeId)
    if (layoutNode) {
      nodes.set(nodeId, layoutNode)
    }
    
    // 如果未折叠，递归收集子节点
    if (!collapsedNodes.value.has(nodeId)) {
      const children = childrenMap.get(nodeId) || []
      children.forEach(childId => collectVisible(childId))
    }
  }
  
  collectVisible(rootId)
  
  return Array.from(nodes.values())
})

// 计算可见边
const visibleEdges = computed(() => {
  const nodesMap = new Map<string, any>()
  
  // 使用 visibleNodes 获取带位置的节点
  visibleNodes.value.forEach((node: any) => {
    nodesMap.set(node.id, node)
  })
  
  const edges: { id: string; path: string }[] = []
  
  chenGenealogyRelationships.forEach(rel => {
    const parent = nodesMap.get(rel.parentId)
    const child = nodesMap.get(rel.childId)
    
    if (parent && child && !collapsedNodes.value.has(rel.parentId)) {
      edges.push({
        id: rel.id,
        path: `M ${parent.x + NODE_WIDTH/2} ${parent.y + NODE_HEIGHT} 
               L ${child.x + NODE_WIDTH/2} ${child.y}`
      })
    }
  })
  
  return edges
})

// 计算布局
function calculateLayout() {
  const nodes = new Map<string, any>()
  const childrenMap = new Map<string, string[]>()
  
  // 初始化节点位置
  chenGenealogyPersons.forEach(p => {
    nodes.set(p.id, {
      ...p,
      x: 0,
      y: (p.generation - 1) * (NODE_HEIGHT + VERTICAL_GAP),
      subtreeWidth: NODE_WIDTH,
      visible: true
    })
  })
  
  // 构建子节点映射
  chenGenealogyRelationships.forEach(rel => {
    if (!childrenMap.has(rel.parentId)) {
      childrenMap.set(rel.parentId, [])
    }
    childrenMap.get(rel.parentId)!.push(rel.childId)
  })
  
  // 从底向上计算布局
  function calculateSubtreeWidth(nodeId: string): number {
    const children = childrenMap.get(nodeId) || []
    
    if (children.length === 0 || collapsedNodes.value.has(nodeId)) {
      return NODE_WIDTH
    }
    
    let totalWidth = 0
    children.forEach((childId, index) => {
      const childWidth = calculateSubtreeWidth(childId)
      totalWidth += childWidth
      if (index < children.length - 1) {
        totalWidth += HORIZONTAL_GAP
      }
    })
    
    nodes.get(nodeId)!.subtreeWidth = Math.max(NODE_WIDTH, totalWidth)
    return nodes.get(nodeId)!.subtreeWidth
  }

  // 计算根节点位置 - 让树居中显示
  const rootId = 'p1'
  // 先计算子树宽度
  calculateSubtreeWidth(rootId)
  // 计算树的实际宽度
  const treeWidth = nodes.get(rootId)!.subtreeWidth

  // 标记可见节点
  nodes.forEach((node: any) => {
    node.visible = !isNodeCollapsed(node.id)
  })

  // 只计算可见节点的最大代數
  let maxVisibleGen = 0
  nodes.forEach((node: any) => {
    if (node.visible && node.generation > maxVisibleGen) {
      maxVisibleGen = node.generation
    }
  })
  const treeHeight = maxVisibleGen * (NODE_HEIGHT + VERTICAL_GAP)

  // 使用固定视图宽度进行居中
  const svgW = VIEWPORT_WIDTH
  // 视口固定高度，内容高度由 svgHeight computed 决定
  const viewportH = 700

  // 居中起始位置 - 基于视口计算
  const startX = Math.max(20, (svgW - treeWidth) / 2)
  const startY = Math.max(20, (viewportH - treeHeight) / 2)
  
  // 修改 assignPositions 接受 Y 偏移
  function assignPositionsY(nodeId: string, left: number, top: number) {
    const node = nodes.get(nodeId)!
    const children = childrenMap.get(nodeId) || []
    
    // 计算节点位置
    node.x = left + node.subtreeWidth / 2 - NODE_WIDTH / 2
    node.y = top + (node.generation - 1) * (NODE_HEIGHT + VERTICAL_GAP)
    
    // 分配子节点位置
    if (!collapsedNodes.value.has(nodeId) && children.length > 0) {
      let currentLeft = left
      children.forEach(childId => {
        const childNode = nodes.get(childId)!
        assignPositionsY(childId, currentLeft, top)
        currentLeft += childNode.subtreeWidth + HORIZONTAL_GAP
      })
    }
  }
  
  assignPositionsY(rootId, startX, startY)
  
  return nodes
}

// SVG 尺寸
const svgWidth = computed(() => {
  const layoutMap = calculateLayout()
  let maxWidth = 0
  let minX = Infinity
  layoutMap.forEach((node: any) => {
    const rightEdge = node.x + NODE_WIDTH
    if (rightEdge > maxWidth) {
      maxWidth = rightEdge
    }
    if (node.x < minX) {
      minX = node.x
    }
  })
  // 使用固定视图宽度作为基础，内容超出时自动扩展
  return Math.max(VIEWPORT_WIDTH, maxWidth - minX + 60)
})

// SVG 高度 - 根据可见节点动态计算
const svgHeight = computed(() => {
  const visible = visibleNodes.value
  if (visible.length === 0) return 400

  const maxGen = Math.max(...visible.map((n: any) => n.generation))
  const contentHeight = maxGen * (NODE_HEIGHT + VERTICAL_GAP) + 100
  return Math.max(400, contentHeight)
})

// 计算缩放后的实际尺寸
const scaledWidth = computed(() => svgWidth.value * scale.value)
const scaledHeight = computed(() => svgHeight.value * scale.value)

// 判断是否需要垂直滚动条
const needVerticalScroll = computed(() => scaledHeight.value > 700)
// 判断是否需要水平滚动条
const needHorizontalScroll = computed(() => scaledWidth.value > VIEWPORT_WIDTH)

// 获取某人父亲
const selectedParent = ref<any>(null)
const selectedChildren = ref<any[]>([])

// 检查节点是否被折叠（只检查祖先，不检查节点本身）
function isNodeCollapsed(nodeId: string): boolean {
  // 只检查祖先节点是否被折叠
  let currentId = nodeId
  while (true) {
    const parent = getParent(currentId)
    if (!parent) return false
    if (collapsedNodes.value.has(parent.id)) return true
    currentId = parent.id
  }
}

// 检查是否有子节点
function hasChildren(personId: string): boolean {
  return chenGenealogyRelationships.some(r => r.parentId === personId)
}

// 切换折叠状态
function toggleNode(personId: string) {
  const newSet = new Set(collapsedNodes.value)
  if (newSet.has(personId)) {
    newSet.delete(personId)
  } else {
    newSet.add(personId)
  }
  collapsedNodes.value = newSet
}

// 点击节点详情
function selectNode(node: any) {
  selectedNode.value = node
  selectedParent.value = getParent(node.id)
  selectedChildren.value = getChildren(node.id)
}

// 展开全部
function expandAll() {
  collapsedNodes.value = new Set()
}

// 折叠全部（只显示第1代和第2代）
function collapseAll() {
  // 将这些节点的父节点加入折叠集合（让父节点隐藏子节点）
  const collapsedSet = new Set<string>()
  chenGenealogyRelationships.forEach(rel => {
    const child = chenGenealogyPersons.find(p => p.id === rel.childId)
    if (child && child.generation >= 3) {
      collapsedSet.add(rel.parentId) // 折叠第2代节点，隐藏第3代
    }
  })
  collapsedNodes.value = collapsedSet
}

// 重置视图
function resetView() {
  collapsedNodes.value = new Set()
  selectedNode.value = null
  scale.value = 1
  panX.value = 0
  panY.value = 0
}

// 放大
function zoomIn() {
  scale.value = Math.min(MAX_SCALE, scale.value + 0.1)
}

// 缩小
function zoomOut() {
  scale.value = Math.max(MIN_SCALE, scale.value - 0.1)
}

// 鼠标按下 - 开始拖动
function onMouseDown(e: MouseEvent) {
  if (e.button !== 0) return // 只响应左键
  isPanning.value = true
  startX.value = e.clientX - panX.value
  startY.value = e.clientY - panY.value
  viewportRef.value!.style.cursor = 'grabbing'
}

// 鼠标移动 - 拖动
function onMouseMove(e: MouseEvent) {
  if (!isPanning.value) return
  const newPanX = e.clientX - startX.value
  const newPanY = e.clientY - startY.value
  
  // 限制平移范围
  panX.value = clampPanX(newPanX)
  panY.value = clampPanY(newPanY)
}

// 计算允许的最大平移范围（基于内容尺寸）
function getPanBounds() {
  const contentW = scaledWidth.value
  const contentH = scaledHeight.value
  const viewportW = VIEWPORT_WIDTH
  const viewportH = 700
  
  // 水平方向：允许向左平移最多 (contentW - viewportW) * scale
  const maxPanX = Math.max(0, (contentW - viewportW) * scale.value)
  // 垂直方向：允许向上平移最多 (contentH - viewportH) * scale
  const maxPanY = Math.max(0, (contentH - viewportH) * scale.value)
  
  return { maxPanX, maxPanY }
}

function clampPanX(value: number) {
  const { maxPanX } = getPanBounds()
  return Math.min(0, Math.max(-maxPanX, value))
}

function clampPanY(value: number) {
  const { maxPanY } = getPanBounds()
  return Math.min(0, Math.max(-maxPanY, value))
}

// 鼠标松开 - 结束拖动
function onMouseUp() {
  isPanning.value = false
  if (viewportRef.value) {
    viewportRef.value.style.cursor = 'default'
  }
}

// 鼠标离开 - 结束拖动
function onMouseLeave() {
  isPanning.value = false
  if (viewportRef.value) {
    viewportRef.value.style.cursor = 'default'
  }
}

// 滚轮缩放
function onWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value + delta))

  // 如果缩放比例没变化，就不执行
  if (newScale === scale.value) return

  // 计算鼠标相对于视口的位置
  const rect = viewportRef.value!.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  // 调整平移量，使缩放以鼠标位置为中心
  const newPanX = mouseX - (mouseX - panX.value) * (newScale / scale.value)
  const newPanY = mouseY - (mouseY - panY.value) * (newScale / scale.value)

  // 限制平移范围
  panX.value = clampPanX(newPanX)
  panY.value = clampPanY(newPanY)

  scale.value = newScale
}

// 计算属性需要在组件中定义
onMounted(() => {
  // 初始化
})
</script>

<style scoped>
.genealogy-tree-container {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tree-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0;
}

.tree-controls {
  display: flex;
  gap: 8px;
}

.ctrl-btn {
  padding: 6px 16px;
  border: 1px solid #E0D6C8;
  background-color: #F9F7F2;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6B5B4F;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:hover {
  background-color: #F0E6D3;
  border-color: #C9A961;
  color: #3E2723;
}

.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zoom-level {
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 0.875rem;
  color: #6B5B4F;
  min-width: 48px;
  justify-content: center;
}

.tree-viewport {
  overflow: auto;
  border: 1px solid #E0D6C8;
  border-radius: 4px;
  background-color: #FAFAFA;
  position: relative;
  /* 固定视口高度 */
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tree-scale-wrapper {
  display: inline-block;
  /* 动态设置transformOrigin以实现居中效果 */
  transition: transform 0.2s ease;
}

.tree-svg {
  display: block;
}

.edge-line {
  stroke: #8D6E63;
  stroke-width: 2;
  fill: none;
  opacity: 0.6;
}

.node-foreign {
  overflow: visible;
}

.node-card {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border: 2px solid #E0D6C8;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.node-card:hover {
  border-color: #C9A961;
  box-shadow: 0 4px 8px rgba(201, 169, 97, 0.2);
  transform: translateY(-2px);
}

.node-card.selected {
  border-color: #8D6E63;
  background-color: #FFF8E7;
}

.node-avatar {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.node-name {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2C1810;
  text-align: center;
}

.node-gen {
  font-size: 0.75rem;
  color: #8B7355;
  margin-top: 2px;
}

.toggle-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #C9A961;
  color: #FFFFFF;
  border: none;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background-color: #8D6E63;
  transform: scale(1.1);
}

.node-detail {
  margin-top: 20px;
  padding: 16px;
  background-color: #F9F7F2;
  border-radius: 6px;
  border: 1px solid #E0D6C8;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.detail-name {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #8B7355;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: #3E2723;
}

.detail-info {
  margin-bottom: 12px;
}

.detail-info p {
  margin: 4px 0;
  font-size: 0.875rem;
  color: #5C4033;
}

.detail-relations {
  padding-top: 12px;
  border-top: 1px solid #E0D6C8;
}

.relation {
  font-size: 0.875rem;
  color: #5C4033;
  margin: 4px 0;
}

.relation strong {
  color: #8D6E63;
}

@media (max-width: 768px) {
  .tree-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .tree-controls {
    flex-wrap: wrap;
  }
  
  .tree-viewport {
    max-height: 400px;
  }
}
</style>
