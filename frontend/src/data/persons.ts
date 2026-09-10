// 人物详情页 Mock 数据
// 所有数据均为测试用，不代表真实家族历史

export interface TimelineEvent {
  year: number
  age: number
  title: string
  description: string
}

export interface MemoryItem {
  id: string
  type: 'photo' | 'story' | 'object'
  title: string
  description: string
  date?: string
  imageUrl?: string
}

export interface RecollectionItem {
  id: string
  personName: string
  relation: string
  content: string
  date: string
}

export interface PersonData {
  id: string
  name: string
  gender: 'male' | 'female'
  generation: number
  birthYear: number
  deathYear?: number
  hometown: string
  occupation: string[]
  briefIntro: string
  biography: string
  timeline: TimelineEvent[]
  memories: MemoryItem[]
  recollections: RecollectionItem[]
  tags: string[]
  // 关系
  parents?: string[]
  spouse?: string
  children?: string[]
  siblings?: string[]
}

// 陈德明（第一代）- 完整数据
const personData: Record<string, PersonData> = {
  'p1': {
    id: 'p1',
    name: '陈德明',
    gender: 'male',
    generation: 1,
    birthYear: 1920,
    deathYear: 2001,
    hometown: '河南淮阳',
    occupation: ['务农', '家族长辈'],
    briefIntro: '陈德明，陈氏家族第一代。一生勤恳耕作，养育两子一女，是家族的根基。',
    biography: `陈德明出生于1920年河南淮阳一个普通农家。少年时期便承担起家庭生计，
    十三岁开始下地耕作，十五岁已能独自耕种十亩田地。

    1946年与邻村李氏成婚，婚后先后育有两子一女。虽然家境并不富裕，
    但他始终秉持"耕读传家"的理念，要求子女认真读书、诚实做人。

    1978年改革开放后，两个儿子陆续外出务工，家中只剩他与老伴二人。
    尽管如此，他仍坚持每天清晨巡视田庄，直到1995年才逐渐减少劳作。

    2001年冬，在家人陪伴下安详离世，享年八十一岁。`,
    timeline: [
      { year: 1920, age: 0, title: '出生', description: '出生于河南淮阳一个普通农家。' },
      { year: 1933, age: 13, title: '开始务农', description: '开始帮助家中从事农业生产。' },
      { year: 1943, age: 23, title: '挑起家庭重担', description: '父亲去世后，逐渐承担起家庭主要劳动。' },
      { year: 1946, age: 26, title: '成家', description: '与李氏成婚，开始组建自己的小家庭。' },
      { year: 1948, age: 28, title: '长子出生', description: '长子陈国强出生。' },
      { year: 1950, age: 30, title: '次子出生', description: '次子陈国安出生。' },
      { year: 1952, age: 32, title: '女儿出生', description: '女儿陈秀兰出生。' },
      { year: 1958, age: 38, title: '生活渐稳', description: '家庭生活逐渐稳定，继续务农并照料老人子女。' },
      { year: 1970, age: 50, title: '迁居附近', description: '因家庭生活需要迁往附近城镇。' },
      { year: 1978, age: 58, title: '开始照料孙辈', description: '逐渐减少劳动，把更多时间留给家庭。' },
      { year: 1985, age: 65, title: '回乡祭祖', description: '带着孙辈回到老宅祭祖，延续家族传统。' },
      { year: 1995, age: 75, title: '整理旧物', description: '开始整理早年的家庭照片和旧物。' },
      { year: 2001, age: 81, title: '离世', description: '在家人陪伴下安静离世，享年八十一岁。' }
    ],
    memories: [
      {
        id: 'm1',
        type: 'photo',
        title: '青年时期的陈德明',
        description: '约1940年代拍摄于河南淮阳老宅前',
        date: '1940',
        imageUrl: '/assets/memories/chen-deming-youth-placeholder.png'
      },
      {
        id: 'm2',
        type: 'photo',
        title: '全家福',
        description: '1955年全家福，陈德明与老伴及三个子女',
        date: '1955'
      },
      {
        id: 'm3',
        type: 'object',
        title: '老账本',
        description: '记录家庭收支的老账本，见证了一个普通农民的勤俭持家',
        date: '1950-1990'
      },
      {
        id: 'm4',
        type: 'photo',
        title: '与孙子们的合影',
        description: '1985年回乡祭祖时与孙辈的合影',
        date: '1985'
      },
      {
        id: 'm5',
        type: 'story',
        title: '院里的老槐树',
        description: '陈德明生前最爱坐在院里的老槐树下，听孩子们说话，也会把年轻时的事情讲给晚辈听。'
      }
    ],
    recollections: [
      {
        id: 'r1',
        personName: '陈国强',
        relation: '长子',
        content: '父亲不太爱说话，但每次孩子回来，他都会提前准备好饭菜。他一生勤恳，从不抱怨，是我们家的顶梁柱。',
        date: '2001'
      },
      {
        id: 'r2',
        personName: '陈国安',
        relation: '次子',
        content: '爷爷教导我们"做人要诚实，做事要踏实"。这句话我一直记在心里。',
        date: '2001'
      },
      {
        id: 'r3',
        personName: '陈秀兰',
        relation: '女儿',
        content: '小时候最喜欢坐在爷爷身边，听他说年轻时候的事情。他的故事或许没有写进历史，但一直留在这个家的记忆里。',
        date: '2001'
      },
      {
        id: 'r4',
        personName: '陈明远',
        relation: '孙子',
        content: '爷爷是我见过最慈祥的老人。他不善言辞，但他的温柔都藏在行动里。',
        date: '2020'
      }
    ],
    tags: ['家族长辈', '务农', '河南淮阳', '陈氏一代'],
    parents: [],
    children: ['p2', 'p3', 'p4']
  },

  'p2': {
    id: 'p2',
    name: '陈国强',
    gender: 'male',
    generation: 2,
    birthYear: 1945,
    hometown: '河南淮阳',
    occupation: ['务工', '父亲', '长子'],
    briefIntro: '陈德明长子，年轻时外出务工，中年后回乡照顾父母。',
    biography: `陈国强1945年出生，是陈德明的长子。年轻时赴外地务工，
    后回乡成家立业。他继承了父亲的勤勉，但也更愿意尝试新事物。

    1970年代后期，他开始带领其他兄弟一起外出打工，
    为家庭创造了更好的生活条件。`,
    timeline: [
      { year: 1945, age: 0, title: '出生', description: '出生于河南淮阳。' },
      { year: 1965, age: 20, title: '外出务工', description: '开始赴外地务工，开拓视野。' },
      { year: 1968, age: 23, title: '成家', description: '与本村张氏成婚。' },
      { year: 1970, age: 25, title: '长子出生', description: '长子陈志远出生。' },
      { year: 1972, age: 27, title: '次子出生', description: '次子陈志高出生。' },
      { year: 1975, age: 30, title: '三子出生', description: '三子陈志强出生。' },
      { year: 1978, age: 33, title: '带领兄弟外出', description: '带领兄弟们一起外出务工，改善家庭生活。' },
      { year: 1985, age: 40, title: '回乡照顾父母', description: '逐渐回乡，照顾年迈的父母。' },
      { year: 1995, age: 50, title: '含饴弄孙', description: '开始照顾孙辈，享受天伦之乐。' },
      { year: 2001, age: 56, title: '送别父亲', description: '在父亲陈德明离世时陪伴在侧。' }
    ],
    memories: [
      {
        id: 'm1',
        type: 'photo',
        title: '青年陈国强',
        description: '约1965年拍摄于外出务工途中',
        date: '1965'
      },
      {
        id: 'm2',
        type: 'story',
        title: '父子故事',
        description: '陈国强常说："父亲教我做人要正，做事要实。"这些话成为他一生的准则。'
      }
    ],
    recollections: [
      {
        id: 'r1',
        personName: '陈志远',
        relation: '长子',
        content: '父亲总是默默做事，从不张扬。他是我见过的最坚韧的人。',
        date: '2020'
      }
    ],
    tags: ['务工', '父亲', '长子'],
    parents: ['p1'],
    children: ['p5', 'p6', 'p7', 'p8']
  },

  'p3': {
    id: 'p3',
    name: '陈国安',
    gender: 'male',
    generation: 2,
    birthYear: 1948,
    hometown: '河南淮阳',
    occupation: ['务农', '父亲'],
    briefIntro: '陈德明次子，一生留守家乡，延续家族根基。',
    biography: `陈国安1948年出生，是陈德明的次子。与兄长不同，
    他选择留在家乡继续务农，守护着祖辈留下的土地。`,
    timeline: [
      { year: 1948, age: 0, title: '出生', description: '出生于河南淮阳。' },
      { year: 1968, age: 20, title: '成家', description: '与本村王氏成婚。' },
      { year: 1973, age: 25, title: '长子出生', description: '长子陈有福出生。' },
      { year: 1976, age: 28, title: '次子出生', description: '次子陈有禄出生。' }
    ],
    memories: [],
    recollections: [],
    tags: ['务农', '父亲', '次子'],
    parents: ['p1'],
    children: ['p9', 'p10']
  },

  'p4': {
    id: 'p4',
    name: '陈秀兰',
    gender: 'female',
    generation: 2,
    birthYear: 1952,
    hometown: '河南淮阳',
    occupation: ['家庭主妇', '母亲'],
    briefIntro: '陈德明女儿，一生持家，是 family 的温暖纽带。',
    biography: `陈秀兰1952年出生，是陈德明的独女。
    她性格温柔贤惠，常年操持家务，照顾父母和弟妹。`,
    timeline: [
      { year: 1952, age: 0, title: '出生', description: '出生于河南淮阳。' },
      { year: 1970, age: 18, title: '出嫁', description: '嫁与本村刘氏。' }
    ],
    memories: [],
    recollections: [],
    tags: ['家庭主妇', '母亲', '女儿'],
    parents: ['p1']
  }
}

// 获取人物数据
export function getPersonData(personId: string): PersonData | null {
  return personData[personId] || null
}

// 根据 ID 获取人物（用于关系展示）
export function getPersonById(personId: string): PersonData | null {
  return personData[personId] || null
}

// 获取所有人物的简要信息（用于列表展示）
export function getAllPersonBrief(): Array<{ id: string; name: string; generation: number; gender: 'male' | 'female' }> {
  return Object.values(personData).map(p => ({
    id: p.id,
    name: p.name,
    generation: p.generation,
    gender: p.gender
  }))
}

// 判断人物是否有完整详情
export function hasPersonDetail(personId: string): boolean {
  return personId in personData
}

// 生成人物页面路径
export function getPersonPath(personId: string, slug: string, genealogyId: string): string {
  const person = personData[personId]
  if (!person) return `/surname/${slug}/genealogy/${genealogyId}`
  return `/surname/${slug}/genealogy/${genealogyId}/member/${personId}`
}

// 获取人物姓名（用于显示）
export function getPersonName(personId: string): string {
  const person = personData[personId]
  return person ? person.name : '未命名'
}

export default personData
