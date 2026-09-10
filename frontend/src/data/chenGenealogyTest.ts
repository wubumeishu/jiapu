// 陈氏家谱测试数据 - 6代
// 所有人姓陈，有真实分支结构

export interface GenealogyPerson {
  id: string
  name: string
  gender: 'male' | 'female'
  generation: number
  birthYear: number
}

export interface GenealogyRelationship {
  id: string
  parentId: string
  childId: string
  type: 'PARENT'
}

export const chenGenealogyPersons: GenealogyPerson[] = [
  // 第一代
  { id: 'p1', name: '陈德明', gender: 'male', generation: 1, birthYear: 1920 },
  
  // 第二代
  { id: 'p2', name: '陈国强', gender: 'male', generation: 2, birthYear: 1945 },
  { id: 'p3', name: '陈国安', gender: 'male', generation: 2, birthYear: 1948 },
  { id: 'p4', name: '陈秀兰', gender: 'female', generation: 2, birthYear: 1952 },
  
  // 第三代 - 陈国强子女(4人)
  { id: 'p5', name: '陈志远', gender: 'male', generation: 3, birthYear: 1970 },
  { id: 'p6', name: '陈志高', gender: 'male', generation: 3, birthYear: 1972 },
  { id: 'p7', name: '陈志强', gender: 'male', generation: 3, birthYear: 1975 },
  { id: 'p8', name: '陈志明', gender: 'male', generation: 3, birthYear: 1978 },
  
  // 第三代 - 陈国安子女(2人)
  { id: 'p9', name: '陈有福', gender: 'male', generation: 3, birthYear: 1973 },
  { id: 'p10', name: '陈有禄', gender: 'male', generation: 3, birthYear: 1976 },
  
  // 第四代 - 陈志远子女(3人)
  { id: 'p12', name: '陈浩', gender: 'male', generation: 4, birthYear: 1995 },
  { id: 'p13', name: '陈杰', gender: 'male', generation: 4, birthYear: 1997 },
  { id: 'p14', name: '陈静', gender: 'female', generation: 4, birthYear: 1999 },
  
  // 第四代 - 陈志高子女(2人)
  { id: 'p15', name: '陈磊', gender: 'male', generation: 4, birthYear: 1996 },
  { id: 'p16', name: '陈雨', gender: 'female', generation: 4, birthYear: 1998 },
  
  // 第四代 - 陈志强子女(1人)
  { id: 'p17', name: '陈晨', gender: 'male', generation: 4, birthYear: 2000 },
  
  // 第四代 - 陈有福子女(2人)
  { id: 'p18', name: '陈文博', gender: 'male', generation: 4, birthYear: 1994 },
  { id: 'p19', name: '陈丽', gender: 'female', generation: 4, birthYear: 1996 },
  
  // 第五代 - 陈浩子女(3人)
  { id: 'p21', name: '陈子轩', gender: 'male', generation: 5, birthYear: 2018 },
  { id: 'p22', name: '陈子涵', gender: 'female', generation: 5, birthYear: 2020 },
  { id: 'p23', name: '陈子豪', gender: 'male', generation: 5, birthYear: 2022 },
  
  // 第五代 - 陈杰子女(2人)
  { id: 'p24', name: '陈思远', gender: 'male', generation: 5, birthYear: 2019 },
  { id: 'p25', name: '陈思琪', gender: 'female', generation: 5, birthYear: 2021 },
  
  // 第五代 - 陈磊子女(1人)
  { id: 'p26', name: '陈浩然', gender: 'male', generation: 5, birthYear: 2020 },
  
  // 第五代 - 陈伟子女(2人)
  { id: 'p27', name: '陈宇轩', gender: 'male', generation: 5, birthYear: 2017 },
  { id: 'p28', name: '陈宇涵', gender: 'female', generation: 5, birthYear: 2019 },
  
  // 第六代 - 陈子轩子女(2人)
  { id: 'p29', name: '陈一诺', gender: 'female', generation: 6, birthYear: 2040 },
  { id: 'p30', name: '陈一行', gender: 'male', generation: 6, birthYear: 2042 },
  
  // 第六代 - 陈思远子女(1人)
  { id: 'p31', name: '陈一念', gender: 'female', generation: 6, birthYear: 2041 },
  
  // 第六代 - 陈宇轩子女(2人)
  { id: 'p32', name: '陈一安', gender: 'male', generation: 6, birthYear: 2040 },
  { id: 'p33', name: '陈一乐', gender: 'female', generation: 6, birthYear: 2043 }
]

export const chenGenealogyRelationships: GenealogyRelationship[] = [
  // 第一代 → 第二代
  { id: 'r1', parentId: 'p1', childId: 'p2', type: 'PARENT' },
  { id: 'r2', parentId: 'p1', childId: 'p3', type: 'PARENT' },
  { id: 'r3', parentId: 'p1', childId: 'p4', type: 'PARENT' },
  
  // 第二代 → 第三代 (陈国强)
  { id: 'r4', parentId: 'p2', childId: 'p5', type: 'PARENT' },
  { id: 'r5', parentId: 'p2', childId: 'p6', type: 'PARENT' },
  { id: 'r6', parentId: 'p2', childId: 'p7', type: 'PARENT' },
  { id: 'r7', parentId: 'p2', childId: 'p8', type: 'PARENT' },
  
  // 第二代 → 第三代 (陈国安)
  { id: 'r8', parentId: 'p3', childId: 'p9', type: 'PARENT' },
  { id: 'r9', parentId: 'p3', childId: 'p10', type: 'PARENT' },
  
  // 第三代 → 第四代 (陈志远)
  { id: 'r11', parentId: 'p5', childId: 'p12', type: 'PARENT' },
  { id: 'r12', parentId: 'p5', childId: 'p13', type: 'PARENT' },
  { id: 'r13', parentId: 'p5', childId: 'p14', type: 'PARENT' },
  
  // 第三代 → 第四代 (陈志高)
  { id: 'r14', parentId: 'p6', childId: 'p15', type: 'PARENT' },
  { id: 'r15', parentId: 'p6', childId: 'p16', type: 'PARENT' },
  
  // 第三代 → 第四代 (陈志强)
  { id: 'r16', parentId: 'p7', childId: 'p17', type: 'PARENT' },
  
  // 第三代 → 第四代 (陈有福)
  { id: 'r17', parentId: 'p9', childId: 'p18', type: 'PARENT' },
  { id: 'r18', parentId: 'p9', childId: 'p19', type: 'PARENT' },
  
  // 第四代 → 第五代 (陈浩)
  { id: 'r20', parentId: 'p12', childId: 'p21', type: 'PARENT' },
  { id: 'r21', parentId: 'p12', childId: 'p22', type: 'PARENT' },
  { id: 'r22', parentId: 'p12', childId: 'p23', type: 'PARENT' },
  
  // 第四代 → 第五代 (陈杰)
  { id: 'r23', parentId: 'p13', childId: 'p24', type: 'PARENT' },
  { id: 'r24', parentId: 'p13', childId: 'p25', type: 'PARENT' },
  
  // 第四代 → 第五代 (陈磊)
  { id: 'r25', parentId: 'p15', childId: 'p26', type: 'PARENT' },
  
  // 第四代 → 第五代 (陈伟)
  { id: 'r26', parentId: 'p18', childId: 'p27', type: 'PARENT' },
  { id: 'r27', parentId: 'p18', childId: 'p28', type: 'PARENT' },
  
  // 第五代 → 第六代 (陈子轩)
  { id: 'r28', parentId: 'p21', childId: 'p29', type: 'PARENT' },
  { id: 'r29', parentId: 'p21', childId: 'p30', type: 'PARENT' },
  
  // 第五代 → 第六代 (陈思远)
  { id: 'r30', parentId: 'p24', childId: 'p31', type: 'PARENT' },
  
  // 第五代 → 第六代 (陈宇轩)
  { id: 'r31', parentId: 'p27', childId: 'p32', type: 'PARENT' },
  { id: 'r32', parentId: 'p27', childId: 'p33', type: 'PARENT' }
]

// 获取某人子女
export function getChildren(personId: string): GenealogyPerson[] {
  const childIds = chenGenealogyRelationships
    .filter(r => r.parentId === personId)
    .map(r => r.childId)
  return chenGenealogyPersons.filter(p => childIds.includes(p.id))
}

// 获取某人父亲
export function getParent(personId: string): GenealogyPerson | null {
  const rel = chenGenealogyRelationships.find(r => r.childId === personId)
  if (!rel) return null
  return chenGenealogyPersons.find(p => p.id === rel.parentId) || null
}
