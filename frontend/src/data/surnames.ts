export interface SurnameGenealogy {
  id: string
  name: string
  location: string
  generations: number
  description: string
  isTest?: boolean
}

export interface SurnameCelebrity {
  name: string
  era: string
  achievement: string
  description: string
}

export interface SurnameMigration {
  era: string
  from: string
  to: string
  description: string
}

export interface SurnameData {
  slug: string
  character: string
  name: string
  pinyin: string
  tone: string
  introduction: string
  origin: string
  ancestor: string
  originEra: string
  population: string
  ranking: string
  distribution: string[]
  commanderies: string[]
  halls: string[]
  celebrities: SurnameCelebrity[]
  migrations: SurnameMigration[]
  genealogies: SurnameGenealogy[]
  tabs: {
    origin: string
    migration: string
    commandery: string
    celebrities: string
    genealogy: string
    community: string
  }
}

const surnameData: Record<string, SurnameData> = {
  'chen': {
    slug: 'chen',
    character: '陈',
    name: '陈',
    pinyin: 'Chén',
    tone: '第二声',
    introduction: '陈姓是中国常见姓氏之一，源自妫姓，得姓始祖为陈胡公满。',
    origin: '陈姓起源于周朝初期，舜帝后裔胡公满被封于陈（今河南淮阳），以国为氏。',
    ancestor: '陈胡公满',
    originEra: '周朝',
    population: '约6700万',
    ranking: '第6大姓',
    distribution: ['河南', '广东', '四川', '福建', '台湾'],
    commanderies: ['颍川郡', '汝南郡', '浚仪郡'],
    halls: ['颍川堂', '汝南堂', '光州堂'],
    celebrities: [
      { name: '陈实', era: '东汉', achievement: '道德名士', description: '东汉时期著名道德家，家风严谨' },
      { name: '陈寿', era: '西晋', achievement: '史学家', description: '著《三国志》' }
    ],
    migrations: [
      { era: '魏晋南北朝', from: '河南', to: '南方各地', description: '衣冠南渡，陈姓迁居江南' },
      { era: '唐宋时期', from: '中原', to: '福建广东', description: '进一步南迁至闽粤地区' }
    ],
    genealogies: [
      { id: 'yimen-chen', name: '一门陈氏家谱', location: '河南淮阳', generations: 6, description: '陈氏家族传承记录', isTest: true }
    ],
    tabs: {
      origin: '起源',
      migration: '迁徙',
      commandery: '郡望',
      celebrities: '名人',
      genealogy: '家谱',
      community: '社区'
    }
  }
}

export function getSurnameData(slug: string): SurnameData | null {
  return surnameData[slug] || null
}

export default surnameData
