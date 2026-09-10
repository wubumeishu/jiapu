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

export const surnameData: Record<string, SurnameData> = {
  chen: {
    slug: 'chen',
    character: '陈',
    name: '陈姓',
    pinyin: 'Chen',
    tone: 'Chén',
    introduction: '陈姓是中国传统姓氏之一，源于妫姓，为舜帝后裔所建。陈姓在全国姓氏中排名前列，是人口众多的大姓之一。',
    origin: '陈姓起源可追溯至上古时期，出自妫姓。周武王灭商后，寻舜帝后裔，封其苗裔媯满于陈（今河南淮阳），建立陈国。春秋时期，陈国被楚国所灭，陈国人以国为氏，遂成陈姓。',
    ancestor: '妫满（陈胡公）',
    originEra: '约公元前1046年（西周初年）',
    population: '约6,800万',
    ranking: '第6大姓',
    distribution: ['河南', '广东', '四川', '湖南', '福建', '浙江', '江苏', '山东'],
    commanderies: ['淮阳郡', '汝南郡', '广陵郡', '颍川郡'],
    halls: ['敦本堂', '重光堂', '博陵堂', '惠和堂'],
    celebrities: [
      {
        name: '陈实',
        era: '东汉',
        achievement: '德行名士',
        description: '字季长，汝南平舆人，东汉名士，以德行著称，门徒数千。'
      },
      {
        name: '陈寿',
        era: '三国·晋',
        achievement: '史学家',
        description: '字承祚，安汉人，著《三国志》，与《史记》《汉书》《后汉书》并称"四史"。'
      },
      {
        name: '陈子昂',
        era: '唐代',
        achievement: '文学家',
        description: '字伯玉，射洪人，唐代著名诗人，主张"汉魏风骨"，代表作《登幽州台歌》。'
      }
    ],
    migrations: [
      {
        era: '先秦',
        from: '河南淮阳',
        to: '全国各地',
        description: '陈国时期，族人主要聚居河南淮阳一带。'
      },
      {
        era: '汉唐',
        from: '河南',
        to: '江淮、四川',
        description: '汉唐时期，陈姓向江淮地区及四川盆地迁徙。'
      },
      {
        era: '宋元',
        from: '中原',
        to: '福建、广东',
        description: '宋元之际，大量陈姓人南迁至福建、广东等地。'
      },
      {
        era: '明清',
        from: '闽粤',
        to: '台湾、东南亚',
        description: '明清时期，陈姓从闽粤渡海至台湾及东南亚各地。'
      }
    ],
    genealogies: [
      {
        id: 'test-chen',
        name: '河南陈氏家谱',
        location: '河南淮阳',
        generations: 6,
        description: '测试家谱树功能，展示6代陈氏家族传承关系。',
        isTest: true
      },
      {
        id: '1',
        name: '河南陈氏家谱',
        location: '河南淮阳',
        generations: 86,
        description: '示例：河南陈氏大宗族谱，记载陈姓在中原地区的传承。'
      },
      {
        id: '2',
        name: '福建陈氏家谱',
        location: '福建泉州',
        generations: 72,
        description: '示例：福建陈氏家谱，记录陈姓在闽地的繁衍发展。'
      },
      {
        id: '3',
        name: '广东陈氏家谱',
        location: '广东广州',
        generations: 68,
        description: '示例：广东陈氏家谱，展示陈姓在岭南地区的家族历史。'
      }
    ],
    tabs: {
      origin: '姓氏起源',
      migration: '迁徙分布',
      commandery: '郡望堂号',
      celebrities: '历史名人',
      genealogy: '家谱概览',
      community: '宗亲会'
    }
  },
  zhang: {
    slug: 'zhang',
    character: '张',
    name: '张姓',
    pinyin: 'Zhang',
    tone: 'Zhāng',
    introduction: '示例数据：资料待完善',
    origin: '示例数据：资料待完善',
    ancestor: '示例数据：资料待完善',
    originEra: '示例数据：资料待完善',
    population: '示例数据：资料待完善',
    ranking: '示例数据：资料待完善',
    distribution: ['示例'],
    commanderies: ['示例'],
    halls: ['示例'],
    celebrities: [],
    migrations: [],
    genealogies: [],
    tabs: {
      origin: '姓氏起源',
      migration: '迁徙分布',
      commandery: '郡望堂号',
      celebrities: '历史名人',
      genealogy: '家谱概览',
      community: '宗亲会'
    }
  }
}

export function getSurnameData(slug: string): SurnameData | undefined {
  return surnameData[slug]
}

export function getAllSurnames(): SurnameData[] {
  return Object.values(surnameData)
}
