import type { Language } from "./languages";

export type PageId = "home" | "storage" | "delivery" | "partner" | "account";

export interface HeroHighlight {
  label: string;
  value: string;
}

export interface Cta {
  label: string;
  href: string;
  eventId?: string;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  subtitle: string;
  description?: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  highlights: HeroHighlight[];
  backgroundImages: string[];
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  icon: "lock" | "route" | "hotel";
}

export interface MapCity {
  id: string;
  name: string;
  headline: string;
  description: string;
  highlight: string;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
}

export interface SectionContent {
  hero: HeroContent;
  featureSection: {
    title: string;
    subtitle: string;
    cards: FeatureCard[];
  };
  searchSection: {
    title: string;
    locationLabel: string;
    locationPlaceholder: string;
    dateLabel: string;
    actionLabel: string;
  };
  mapSection: {
    title: string;
    subtitle: string;
    callout: string;
    cities: MapCity[];
    exploreLabel: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
    footnote: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    entries: Testimonial[];
  };
  partnerBanner: {
    title: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  meta: {
    title: string;
    description: string;
  };
}

export interface TranslationContent {
  languageName: string;
  analytics: {
    storageClick: string;
    transferClick: string;
  };
  navigation: {
    home: string;
    storage: string;
    delivery: string;
    partner: string;
    account: string;
  };
  footer: {
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    partner: string;
    rights: string;
    contactPhone: string;
    contactMail: string;
  };
  partnerHighlight: {
    title: string;
    subtitle: string;
    cta: string;
  };
  common: {
    featureSection: SectionContent["featureSection"];
    searchSection: SectionContent["searchSection"];
    mapSection: SectionContent["mapSection"];
    howItWorks: SectionContent["howItWorks"];
    testimonials: SectionContent["testimonials"];
    partnerBanner: SectionContent["partnerBanner"];
  };
  pages: Record<PageId, Pick<SectionContent, "hero" | "meta">>;
}

const englishCommon: TranslationContent["common"] = {
  featureSection: {
    title: "One platform for luggage freedom",
    subtitle: "Choose lockers, transfers or concierge support with the same polished experience.",
    cards: [
      {
        id: "locker",
        title: "Smart locker storage",
        description: "24/7 access near landmarks with climate control, CCTV and instant mobile unlocks.",
        linkLabel: "Explore storage",
        icon: "lock",
      },
      {
        id: "transfer",
        title: "Same-day luggage transfer",
        description: "Door-to-door delivery between airports, hotels and homes backed by insured couriers.",
        linkLabel: "Plan a transfer",
        icon: "route",
      },
      {
        id: "concierge",
        title: "Hotel concierge network",
        description: "Certified partners extend storage and transfer services to every guest with seamless signage.",
        linkLabel: "Partner benefits",
        icon: "hotel",
      },
    ],
  },
  searchSection: {
    title: "Search availability in your city",
    locationLabel: "City or landmark",
    locationPlaceholder: "Try Shanghai Tower, Shibuya, Myeongdong…",
    dateLabel: "Drop-off date",
    actionLabel: "Search",
  },
  mapSection: {
    title: "Coverage built for city explorers",
    subtitle: "Tap a city to preview hero locations.",
    callout: "Each marker is a verified Lockerlink venue.",
    exploreLabel: "See city guide",
    cities: [
      {
        id: "shanghai",
        name: "Shanghai",
        headline: "Line 2 coverage from Bund to Pudong",
        description: "Lockers inside metro hubs, business districts and Disneyland keep your day flexible.",
        highlight: "Hot tip: Nanjing Road lockers fill up by 10:00 am—book ahead.",
      },
      {
        id: "tokyo",
        name: "Tokyo",
        headline: "Seamless hops across the Yamanote Line",
        description: "Concierge partners in Shinjuku and Ginza greet early arrivals and late departures.",
        highlight: "Enable auto-transfer to send bags straight to your hotel lobby.",
      },
      {
        id: "seoul",
        name: "Seoul",
        headline: "Enjoy Hongdae nights hands free",
        description: "Store near street markets while couriers deliver to Incheon or your stay.",
        highlight: "Express transfers average a 90-minute turnaround.",
      },
    ],
  },
  howItWorks: {
    title: "How Lockerlink works",
    subtitle: "Three simple steps to lighter travel.",
    steps: [
      {
        id: "search",
        title: "Search & select",
        description: "Pick the locker size or transfer slot that matches your itinerary.",
      },
      {
        id: "confirm",
        title: "Confirm & pay",
        description: "Checkout with Apple Pay, Alipay or card and receive instant access codes.",
      },
      {
        id: "enjoy",
        title: "Drop, track & enjoy",
        description: "Unlock in seconds or hand off to a courier while you focus on the journey.",
      },
    ],
    footnote: "Every booking includes insurance, delay protection and 24/7 support.",
  },
  testimonials: {
    title: "Trusted by travellers and partners",
    subtitle: "Real stories from people who rely on Lockerlink every week.",
    entries: [
      {
        id: "emma",
        name: "Emma Sato",
        role: "Product designer",
        location: "Tokyo, Japan",
        quote: "I land, store my bag near the station and start exploring with a coffee in hand.",
        rating: 5,
        image: "/city_imgs/photo-1477959858617-67f85cf4f1df.avif",
      },
      {
        id: "li-wei",
        name: "Li Wei",
        role: "Hotel operations lead",
        location: "Shanghai, China",
        quote: "Lockerlink keeps our lobby calm even on peak days. Guests love the polished flow.",
        rating: 5,
        image: "/city_imgs/swapnil-bapat-sJ7pYyJFyuA-unsplash.jpg",
      },
      {
        id: "minji",
        name: "Minji Park",
        role: "Travel blogger",
        location: "Seoul, South Korea",
        quote: "Handing bags to the courier means I can shoot content all afternoon, hands free.",
        rating: 5,
        image: "/city_imgs/berkay-gumustekin-hRg1KL4-AUE-unsplash.jpg",
      },
    ],
  },
  partnerBanner: {
    title: "Unlock new revenue with Lockerlink",
    subtitle: "Our team helps hotels, malls and transit hubs deploy smart lockers in days.",
    primaryCta: {
      label: "Talk to the team",
      href: "/partner",
    },
    secondaryCta: {
      label: "Download partner kit",
      href: "#download-partner-kit",
    },
  },
};

const englishPages: TranslationContent["pages"] = {
  home: {
    meta: {
      title: "Lockerlink | Travel Light. Store Smart.",
      description:
        "Premium luggage storage and transfer services across Asia with smart lockers, insured couriers and partner hotels.",
    },
    hero: {
      eyebrow: "Lockerlink",
      title: "Travel light. Store smart.",
      subtitle: "Reserve storage or schedule delivery in under a minute.",
      description: "Smart lockers, insured couriers and partner hotels keep every journey effortless.",
      primaryCta: {
        label: "Book storage",
        href: "/storage",
        eventId: "home_store_click",
      },
      secondaryCta: {
        label: "Arrange transfer",
        href: "/delivery",
        eventId: "home_transfer_click",
      },
      highlights: [
        { label: "Cities covered", value: "36" },
        { label: "Average check-in", value: "45s" },
        { label: "Customer rating", value: "4.9 / 5" },
      ],
      backgroundImages: [
        "/city_imgs/matt-jones-9CPAjGVB378-unsplash.jpg",
        "/city_imgs/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
        "/city_imgs/victor-he-0xn9T2cEigE-unsplash.jpg",
      ],
    },
  },
  storage: {
    meta: {
      title: "Lockerlink Storage | Smart lockers across Asia",
      description: "Contactless lockers with insurance, CCTV security and flexible extensions whenever you need them.",
    },
    hero: {
      eyebrow: "Storage",
      title: "Contactless lockers wherever you land.",
      subtitle: "Choose the right size, unlock with a tap and extend remotely.",
      description: "24/7 coverage, CCTV security and travel-friendly insurance come standard.",
      primaryCta: {
        label: "Find lockers",
        href: "#locker-search",
        eventId: "storage_primary_click",
      },
      secondaryCta: {
        label: "See pricing",
        href: "#services",
        eventId: "storage_secondary_click",
      },
      highlights: [
        { label: "Average unlock", value: "12s" },
        { label: "Insurance coverage", value: "¥5,000" },
        { label: "Uptime", value: "99.8%" },
      ],
      backgroundImages: [
        "/city_imgs/freeman-zhou-oV9hp8wXkPE-unsplash.jpg",
        "/city_imgs/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
        "/city_imgs/matt-jones-9CPAjGVB378-unsplash.jpg",
      ],
    },
  },
  delivery: {
    meta: {
      title: "Lockerlink Delivery | Insured luggage transfers",
      description: "Book door-to-door luggage delivery with live tracking, insured couriers and flexible rerouting.",
    },
    hero: {
      eyebrow: "Delivery",
      title: "Your bags take the miles. You take the moments.",
      subtitle: "Book door-to-door transfers with live tracking and insured couriers.",
      description: "Plan seamless hand-offs between airports, hotels and homes across the city.",
      primaryCta: {
        label: "Schedule transfer",
        href: "#locker-search",
        eventId: "delivery_primary_click",
      },
      secondaryCta: {
        label: "View routes",
        href: "#map",
        eventId: "delivery_secondary_click",
      },
      highlights: [
        { label: "Guaranteed window", value: "60m" },
        { label: "Courier partners", value: "480+" },
        { label: "On-time rate", value: "99.6%" },
      ],
      backgroundImages: [
        "/city_imgs/victor-he-0xn9T2cEigE-unsplash.jpg",
        "/city_imgs/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
        "/city_imgs/photo-1477959858617-67f85cf4f1df.avif",
      ],
    },
  },
  partner: {
    meta: {
      title: "Lockerlink Partners | Monetise unused space",
      description: "Join hotels, malls and stations who unlock new revenue with Lockerlink smart lockers and transfer services.",
    },
    hero: {
      eyebrow: "Partners",
      title: "Turn unused space into a hero service.",
      subtitle: "Join hotels, malls and stations boosting guest happiness and revenue.",
      description: "We install lockers, train staff and provide analytics so you launch in days.",
      primaryCta: {
        label: "Book a consultation",
        href: "#partner-banner",
        eventId: "partner_primary_click",
      },
      secondaryCta: {
        label: "See case studies",
        href: "#testimonials",
        eventId: "partner_secondary_click",
      },
      highlights: [
        { label: "Revenue uplift", value: "+28%" },
        { label: "Go-live speed", value: "72h" },
        { label: "NPS lift", value: "+18" },
      ],
      backgroundImages: [
        "/city_imgs/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
        "/city_imgs/victor-he-0xn9T2cEigE-unsplash.jpg",
        "/city_imgs/swapnil-bapat-sJ7pYyJFyuA-unsplash.jpg",
      ],
    },
  },
  account: {
    meta: {
      title: "Lockerlink Account | Manage every booking",
      description: "Sign in to extend locker time, track transfers, invite companions and unlock loyalty perks.",
    },
    hero: {
      eyebrow: "Account",
      title: "One dashboard for every locker and delivery.",
      subtitle: "Extend bookings, share access and stay notified in real time.",
      description: "Lockerlink keeps travellers, assistants and families aligned across devices.",
      primaryCta: {
        label: "Sign in",
        href: "#locker-search",
        eventId: "account_primary_click",
      },
      secondaryCta: {
        label: "Create account",
        href: "#services",
        eventId: "account_secondary_click",
      },
      highlights: [
        { label: "Active members", value: "120K+" },
        { label: "Average savings", value: "22%" },
        { label: "Support response", value: "<30s" },
      ],
      backgroundImages: [
        "/city_imgs/photo-1477959858617-67f85cf4f1df.avif",
        "/city_imgs/swapnil-bapat-sJ7pYyJFyuA-unsplash.jpg",
        "/city_imgs/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      ],
    },
  },
};

const en: TranslationContent = {
  languageName: "English",
  analytics: {
    storageClick: "home_store_click",
    transferClick: "home_transfer_click",
  },
  navigation: {
    home: "Home",
    storage: "Storage",
    delivery: "Delivery",
    partner: "Partner",
    account: "Account",
  },
  footer: {
    about: "About Lockerlink",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    partner: "Partner With Us",
    rights: "© 2024 Lockerlink. All rights reserved.",
    contactPhone: "+86 21 8888 6666",
    contactMail: "hello@lockerlink.com",
  },
  partnerHighlight: {
    title: "Unlock new revenue from unused space",
    subtitle: "Hotels, malls and transit hubs trust Lockerlink to digitise luggage services in days.",
    cta: "Become a partner",
  },
  common: englishCommon,
  pages: englishPages,
};

const chineseCommon: TranslationContent["common"] = {
  featureSection: {
    title: "一站式行李自由平台",
    subtitle: "同样极致的体验，囊括寄存柜、行李转运与礼宾合作服务。",
    cards: [
      {
        id: "locker",
        title: "智能寄存柜",
        description: "地标旁 24 小时可取，恒温、防护与手机秒开一应俱全。",
        linkLabel: "了解寄存服务",
        icon: "lock",
      },
      {
        id: "transfer",
        title: "当日行李转运",
        description: "机场、酒店、民宿之间的门到门配送，全程保险守护。",
        linkLabel: "规划转运",
        icon: "route",
      },
      {
        id: "concierge",
        title: "酒店礼宾网络",
        description: "认证合作伙伴将寄存与转运延伸到每一位客人，指引清晰。",
        linkLabel: "合作亮点",
        icon: "hotel",
      },
    ],
  },
  searchSection: {
    title: "在所在城市快速查找",
    locationLabel: "城市或地标",
    locationPlaceholder: "试试 上海外滩、涩谷站、明洞…",
    dateLabel: "寄存日期",
    actionLabel: "搜索",
  },
  mapSection: {
    title: "覆盖高频旅途动线",
    subtitle: "点击城市即可预览核心站点。",
    callout: "每一个标记点都是经过认证的 Lockerlink 服务点。",
    exploreLabel: "查看城市指南",
    cities: [
      {
        id: "shanghai",
        name: "上海",
        headline: "2 号线贯通外滩与浦东",
        description: "地铁枢纽、商务区与迪士尼均设寄存柜，行程更灵活。",
        highlight: "提示：南京路步行街点位常在上午 10 点前售罄，请提前预订。",
      },
      {
        id: "tokyo",
        name: "东京",
        headline: "山手线沿线无缝衔接",
        description: "新宿与银座礼宾合作点，轻松应对早到晚走的旅客。",
        highlight: "开启自动转运，行李可直送酒店大堂。",
      },
      {
        id: "seoul",
        name: "首尔",
        headline: "弘大夜生活也能轻松享受",
        description: "夜市附近寄存，骑手即可送往仁川机场或下榻住所。",
        highlight: "加急转运平均 90 分钟完成。",
      },
    ],
  },
  howItWorks: {
    title: "Lockerlink 如何运作",
    subtitle: "三步即可享受轻装旅程。",
    steps: [
      {
        id: "search",
        title: "搜索并选择",
        description: "根据行程选择合适的寄存柜或转运时段。",
      },
      {
        id: "confirm",
        title: "确认并支付",
        description: "支持 Apple Pay、支付宝或银行卡，即刻获取开箱码。",
      },
      {
        id: "enjoy",
        title: "轻松寄存与追踪",
        description: "几秒完成寄存或交接行李，旅途中时刻掌握动态。",
      },
    ],
    footnote: "每笔订单均含保险、延误保障与 24 小时客服。",
  },
  testimonials: {
    title: "旅客与合作伙伴的共同信赖",
    subtitle: "真实故事来自每周使用 Lockerlink 的人们。",
    entries: [
      {
        id: "emma",
        name: "佐藤惠美",
        role: "产品设计师",
        location: "日本 东京",
        quote: "落地后把行李寄存在车站旁，拿着咖啡就能直接开启探索。",
        rating: 5,
        image: "/city_imgs/photo-1477959858617-67f85cf4f1df.avif",
      },
      {
        id: "li-wei",
        name: "李伟",
        role: "酒店运营负责人",
        location: "中国 上海",
        quote: "Lockerlink 让我们即便在高峰时段也能保持大堂井然有序。",
        rating: 5,
        image: "/city_imgs/swapnil-bapat-sJ7pYyJFyuA-unsplash.jpg",
      },
      {
        id: "minji",
        name: "朴敏智",
        role: "旅行博主",
        location: "韩国 首尔",
        quote: "把行李交给骑手后，我就能安心拍摄内容，彻底解放双手。",
        rating: 5,
        image: "/city_imgs/berkay-gumustekin-hRg1KL4-AUE-unsplash.jpg",
      },
    ],
  },
  partnerBanner: {
    title: "用 Lockerlink 解锁新收益",
    subtitle: "我们的团队帮助酒店、商场与交通枢纽在数日内落地智能寄存。",
    primaryCta: {
      label: "联系团队",
      href: "/partner",
    },
    secondaryCta: {
      label: "下载合作资料",
      href: "#download-partner-kit",
    },
  },
};

const chinesePages: TranslationContent["pages"] = {
  home: {
    meta: {
      title: "Lockerlink | 轻装上阵 智慧寄存",
      description: "Lockerlink 覆盖亚洲核心城市，提供智能寄存与转运服务，轻松预订，全程可视化保障。",
    },
    hero: {
      eyebrow: "Lockerlink",
      title: "轻装上阵，智慧出行",
      subtitle: "一分钟内完成寄存或转运预订。",
      description: "智能寄存柜、保险骑手与合作酒店让每段旅程更轻松。",
      primaryCta: {
        label: "立即寄存",
        href: "/storage",
        eventId: "home_store_click",
      },
      secondaryCta: {
        label: "预约转运",
        href: "/delivery",
        eventId: "home_transfer_click",
      },
      highlights: [
        { label: "覆盖城市", value: "36" },
        { label: "平均办理", value: "45 秒" },
        { label: "用户评分", value: "4.9 / 5" },
      ],
      backgroundImages: englishPages.home.hero.backgroundImages,
    },
  },
  storage: {
    meta: {
      title: "Lockerlink 寄存服务 | 智能寄存柜",
      description: "恒温防护、监控保障、随时延长时长，Lockerlink 寄存让旅途更自由。",
    },
    hero: {
      eyebrow: "寄存服务",
      title: "随落地随寄存",
      subtitle: "挑选合适规格，扫码秒开，随时延长。",
      description: "24 小时运营、实时监控与旅客专属保险全面守护。",
      primaryCta: {
        label: "查找寄存点",
        href: "#locker-search",
        eventId: "storage_primary_click",
      },
      secondaryCta: {
        label: "查看价格",
        href: "#services",
        eventId: "storage_secondary_click",
      },
      highlights: [
        { label: "平均开箱", value: "12 秒" },
        { label: "保险额度", value: "¥5,000" },
        { label: "设备在线", value: "99.8%" },
      ],
      backgroundImages: englishPages.storage.hero.backgroundImages,
    },
  },
  delivery: {
    meta: {
      title: "Lockerlink 转运服务 | 门到门行李配送",
      description: "实时追踪、保险保障与灵活改派，行李转运交给 Lockerlink。",
    },
    hero: {
      eyebrow: "转运服务",
      title: "让行李跑远路，你专注精彩瞬间",
      subtitle: "预约门到门转运，实时追踪并由保险骑手护航。",
      description: "覆盖机场、酒店与住所的无缝交接，轻松规划。",
      primaryCta: {
        label: "安排转运",
        href: "#locker-search",
        eventId: "delivery_primary_click",
      },
      secondaryCta: {
        label: "查看线路",
        href: "#map",
        eventId: "delivery_secondary_click",
      },
      highlights: [
        { label: "承诺时窗", value: "60 分钟" },
        { label: "合作骑手", value: "480+" },
        { label: "准点率", value: "99.6%" },
      ],
      backgroundImages: englishPages.delivery.hero.backgroundImages,
    },
  },
  partner: {
    meta: {
      title: "Lockerlink 合作伙伴 | 空间增值方案",
      description: "酒店、商场与交通枢纽借助 Lockerlink 快速上线智能寄存服务，实现收益与口碑双提升。",
    },
    hero: {
      eyebrow: "合作伙伴",
      title: "让闲置空间成为明星服务",
      subtitle: "加入正在提升客户满意度与收入的酒店、商场与车站。",
      description: "Lockerlink 负责设备安装、人员培训与数据分析，数日即可上线。",
      primaryCta: {
        label: "预约顾问",
        href: "#partner-banner",
        eventId: "partner_primary_click",
      },
      secondaryCta: {
        label: "查看案例",
        href: "#testimonials",
        eventId: "partner_secondary_click",
      },
      highlights: [
        { label: "营收提升", value: "+28%" },
        { label: "上线速度", value: "72 小时" },
        { label: "NPS 提升", value: "+18" },
      ],
      backgroundImages: englishPages.partner.hero.backgroundImages,
    },
  },
  account: {
    meta: {
      title: "Lockerlink 账户 | 管理全部预订",
      description: "延长寄存、追踪转运、邀请同行与享受会员福利，一切在一个账户完成。",
    },
    hero: {
      eyebrow: "我的账户",
      title: "所有寄存与转运，一目了然",
      subtitle: "实时延长预订、共享权限并接收即时提醒。",
      description: "Lockerlink 让旅客、助理与家人跨设备无缝协作。",
      primaryCta: {
        label: "登录",
        href: "#locker-search",
        eventId: "account_primary_click",
      },
      secondaryCta: {
        label: "创建账户",
        href: "#services",
        eventId: "account_secondary_click",
      },
      highlights: [
        { label: "活跃会员", value: "120K+" },
        { label: "平均节省", value: "22%" },
        { label: "客服响应", value: "<30 秒" },
      ],
      backgroundImages: englishPages.account.hero.backgroundImages,
    },
  },
};

const zh: TranslationContent = {
  languageName: "简体中文",
  analytics: en.analytics,
  navigation: {
    home: "首页",
    storage: "存包服务",
    delivery: "转运服务",
    partner: "合作伙伴",
    account: "我的账户",
  },
  footer: {
    about: "关于 Lockerlink",
    contact: "联系我们",
    privacy: "隐私政策",
    terms: "使用条款",
    partner: "我要合作",
    rights: "© 2024 Lockerlink. 保留所有权利。",
    contactPhone: "400-666-8888",
    contactMail: "support@lockerlink.com",
  },
  partnerHighlight: {
    title: "让闲置空间产生新收入",
    subtitle: "酒店、商场与交通枢纽信任 Lockerlink，几天内即可完成数字化升级。",
    cta: "申请合作",
  },
  common: chineseCommon,
  pages: chinesePages,
};

const japaneseCommon: TranslationContent["common"] = {
  featureSection: {
    title: "荷物の自由を叶えるワンプラットフォーム",
    subtitle: "ロッカー、荷物転送、コンシェルジュ連携まで同じ上質な体験で提供します。",
    cards: [
      {
        id: "locker",
        title: "スマートロッカー",
        description: "主要スポットに24時間設置。温度管理と監視カメラ、モバイル解錠に対応。",
        linkLabel: "ロッカーを確認",
        icon: "lock",
      },
      {
        id: "transfer",
        title: "当日荷物転送",
        description: "空港・ホテル・自宅をつなぐドアツードア配送。保険付きで安心です。",
        linkLabel: "転送を計画",
        icon: "route",
      },
      {
        id: "concierge",
        title: "ホテルコンシェルジュネットワーク",
        description: "認定パートナーが全てのゲストに寄存と転送サービスを提供します。",
        linkLabel: "パートナーの強み",
        icon: "hotel",
      },
    ],
  },
  searchSection: {
    title: "都市で空き状況を検索",
    locationLabel: "都市またはランドマーク",
    locationPlaceholder: "例：上海タワー、渋谷、明洞…",
    dateLabel: "預け日",
    actionLabel: "検索",
  },
  mapSection: {
    title: "都市を自由に楽しむためのカバレッジ",
    subtitle: "都市をタップして主要スポットをプレビュー。",
    callout: "マーカーはすべて認定された Lockerlink 拠点です。",
    exploreLabel: "都市ガイドを見る",
    cities: [
      {
        id: "shanghai",
        name: "上海",
        headline: "外灘から浦東まで地下鉄2号線をカバー",
        description: "主要駅、ビジネス街、ディズニーにロッカーを配置し、予定に柔軟に対応。",
        highlight: "豆知識：南京路のロッカーは午前10時までに埋まることが多いので要予約。",
      },
      {
        id: "tokyo",
        name: "東京",
        headline: "山手線エリアをシームレスに移動",
        description: "新宿・銀座のコンシェルジュが早着・遅発のゲストをサポート。",
        highlight: "自動転送を有効にすると荷物がホテルロビーに直接届きます。",
      },
      {
        id: "seoul",
        name: "ソウル",
        headline: "弘大の夜も手ぶらで満喫",
        description: "市場周辺で預けている間に、宅配が仁川空港や宿泊先へお届け。",
        highlight: "特急転送は平均90分で完了します。",
      },
    ],
  },
  howItWorks: {
    title: "Lockerlink の使い方",
    subtitle: "3ステップで軽やかな旅を実現。",
    steps: [
      {
        id: "search",
        title: "検索して選択",
        description: "旅程に合わせて最適なロッカーサイズや転送枠を選びます。",
      },
      {
        id: "confirm",
        title: "確認と支払い",
        description: "Apple Pay、クレジットカードなどで決済し、解錠コードを即時受け取ります。",
      },
      {
        id: "enjoy",
        title: "預けて楽しむ",
        description: "数秒で解錠、もしくは宅配に引き渡し、旅に集中できます。",
      },
    ],
    footnote: "すべての予約に保険・遅延保証・24時間サポートが含まれます。",
  },
  testimonials: {
    title: "旅人とパートナーに信頼されています",
    subtitle: "毎週 Lockerlink に頼る人々の声。",
    entries: [
      {
        id: "emma",
        name: "佐藤エマ",
        role: "プロダクトデザイナー",
        location: "日本・東京",
        quote: "駅近くで荷物を預け、コーヒー片手にすぐ街歩きを始められます。",
        rating: 5,
        image: "/city_imgs/photo-1477959858617-67f85cf4f1df.avif",
      },
      {
        id: "li-wei",
        name: "李偉",
        role: "ホテル運営責任者",
        location: "中国・上海",
        quote: "ピーク時でもロビーが落ち着いており、お客様の満足度も高まっています。",
        rating: 5,
        image: "/city_imgs/swapnil-bapat-sJ7pYyJFyuA-unsplash.jpg",
      },
      {
        id: "minji",
        name: "ミンジ・パク",
        role: "トラベルブロガー",
        location: "韓国・ソウル",
        quote: "荷物を宅配に預ければ、撮影に集中できて手ぶらで動けます。",
        rating: 5,
        image: "/city_imgs/berkay-gumustekin-hRg1KL4-AUE-unsplash.jpg",
      },
    ],
  },
  partnerBanner: {
    title: "Lockerlink で新たな収益を",
    subtitle: "ホテル・商業施設・交通ハブが数日でスマートロッカーを導入できます。",
    primaryCta: {
      label: "チームへ相談",
      href: "/partner",
    },
    secondaryCta: {
      label: "パートナー資料を入手",
      href: "#download-partner-kit",
    },
  },
};

const japanesePages: TranslationContent["pages"] = {
  home: {
    meta: {
      title: "Lockerlink | 軽やかに旅し、スマートに預ける",
      description: "アジア主要都市で利用できるラゲッジストレージと転送サービス。スマートロッカーと保険付き配送で安心。",
    },
    hero: {
      eyebrow: "Lockerlink",
      title: "荷物は軽く、旅はもっと自由に",
      subtitle: "1分以内で寄預かりや転送を予約。",
      description: "スマートロッカー、保険付き宅配、提携ホテルが旅を支えます。",
      primaryCta: {
        label: "寄預かりを予約",
        href: "/storage",
        eventId: "home_store_click",
      },
      secondaryCta: {
        label: "転送を手配",
        href: "/delivery",
        eventId: "home_transfer_click",
      },
      highlights: [
        { label: "対応都市", value: "36" },
        { label: "平均手続き", value: "45秒" },
        { label: "評価", value: "4.9 / 5" },
      ],
      backgroundImages: englishPages.home.hero.backgroundImages,
    },
  },
  storage: {
    meta: {
      title: "Lockerlink ストレージ | スマートロッカー",
      description: "24時間利用可能な非接触ロッカー。監視と保険付きで安心して預けられます。",
    },
    hero: {
      eyebrow: "ストレージ",
      title: "どこへ到着してもすぐに預ける",
      subtitle: "サイズを選び、ワンタップで解錠、遠隔延長も可能。",
      description: "24時間体制の監視と旅行者向け保険が標準搭載。",
      primaryCta: {
        label: "ロッカーを探す",
        href: "#locker-search",
        eventId: "storage_primary_click",
      },
      secondaryCta: {
        label: "料金を見る",
        href: "#services",
        eventId: "storage_secondary_click",
      },
      highlights: [
        { label: "平均解錠", value: "12秒" },
        { label: "保険補償", value: "¥5,000" },
        { label: "稼働率", value: "99.8%" },
      ],
      backgroundImages: englishPages.storage.hero.backgroundImages,
    },
  },
  delivery: {
    meta: {
      title: "Lockerlink デリバリー | 安心の荷物転送",
      description: "ライブトラッキングと保険付きの宅配で、空港・ホテル・自宅をシームレスにつなぎます。",
    },
    hero: {
      eyebrow: "デリバリー",
      title: "荷物は移動を担当、あなたは瞬間を楽しむ",
      subtitle: "ライブ追跡と保険付きの宅配を予約。",
      description: "都市内の空港、ホテル、自宅間でスムーズに受け渡しが可能です。",
      primaryCta: {
        label: "転送を予約",
        href: "#locker-search",
        eventId: "delivery_primary_click",
      },
      secondaryCta: {
        label: "ルートを見る",
        href: "#map",
        eventId: "delivery_secondary_click",
      },
      highlights: [
        { label: "保証時間", value: "60分" },
        { label: "宅配パートナー", value: "480+" },
        { label: "準時率", value: "99.6%" },
      ],
      backgroundImages: englishPages.delivery.hero.backgroundImages,
    },
  },
  partner: {
    meta: {
      title: "Lockerlink パートナー | 空きスペースの価値化",
      description: "ホテルや商業施設、駅が Lockerlink で収益と顧客満足度を同時に向上。",
    },
    hero: {
      eyebrow: "パートナー",
      title: "空きスペースを特別なサービスへ",
      subtitle: "ホテル・商業施設・駅がゲスト満足度と収益を高めています。",
      description: "ロッカー設置、スタッフ研修、分析ツールまで数日で導入完了。",
      primaryCta: {
        label: "相談を予約",
        href: "#partner-banner",
        eventId: "partner_primary_click",
      },
      secondaryCta: {
        label: "事例を見る",
        href: "#testimonials",
        eventId: "partner_secondary_click",
      },
      highlights: [
        { label: "売上増", value: "+28%" },
        { label: "導入期間", value: "72時間" },
        { label: "NPS向上", value: "+18" },
      ],
      backgroundImages: englishPages.partner.hero.backgroundImages,
    },
  },
  account: {
    meta: {
      title: "Lockerlink アカウント | 予約を一括管理",
      description: "ロッカー延長、転送追跡、同行者共有、特典管理までワンアカウントで完結。",
    },
    hero: {
      eyebrow: "アカウント",
      title: "ロッカーも転送も1つのダッシュボードで",
      subtitle: "予約延長、アクセス共有、リアルタイム通知を実現。",
      description: "旅人もアシスタントも家族も、Lockerlink がデバイスをまたいで連携します。",
      primaryCta: {
        label: "ログイン",
        href: "#locker-search",
        eventId: "account_primary_click",
      },
      secondaryCta: {
        label: "アカウント作成",
        href: "#services",
        eventId: "account_secondary_click",
      },
      highlights: [
        { label: "アクティブ会員", value: "120K+" },
        { label: "平均節約", value: "22%" },
        { label: "サポート応答", value: "<30秒" },
      ],
      backgroundImages: englishPages.account.hero.backgroundImages,
    },
  },
};

const ja: TranslationContent = {
  languageName: "日本語",
  analytics: en.analytics,
  navigation: {
    home: "ホーム",
    storage: "寄預かり",
    delivery: "転送",
    partner: "パートナー",
    account: "アカウント",
  },
  footer: {
    about: "Lockerlink について",
    contact: "お問い合わせ",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    partner: "パートナー募集",
    rights: "© 2024 Lockerlink. All rights reserved.",
    contactPhone: "+81 3 1234 5678",
    contactMail: "jp@lockerlink.com",
  },
  partnerHighlight: {
    title: "遊休スペースで新収益を",
    subtitle: "ホテル・商業施設・交通ハブが Lockerlink を信頼して数日で導入。",
    cta: "パートナーになる",
  },
  common: japaneseCommon,
  pages: japanesePages,
};

const koreanCommon: TranslationContent["common"] = {
  featureSection: {
    title: "수하물을 자유롭게 하는 올인원 플랫폼",
    subtitle: "보관, 당일 배송, 컨시어지 협력을 모두 동일한 프리미엄 경험으로 제공합니다.",
    cards: [
      {
        id: "locker",
        title: "스마트 보관함",
        description: "주요 명소 인근 24시간 이용, 온도 관리와 CCTV, 모바일 즉시 개방 지원.",
        linkLabel: "보관 서비스 보기",
        icon: "lock",
      },
      {
        id: "transfer",
        title: "당일 수하물 배송",
        description: "공항·호텔·숙소 간 문앞까지 보험이 포함된 배송으로 연결합니다.",
        linkLabel: "배송 계획하기",
        icon: "route",
      },
      {
        id: "concierge",
        title: "호텔 컨시어지 네트워크",
        description: "인증 파트너가 모든 고객에게 보관과 배송 서비스를 매끄럽게 제공합니다.",
        linkLabel: "파트너 혜택",
        icon: "hotel",
      },
    ],
  },
  searchSection: {
    title: "도시에서 이용 가능 여부 검색",
    locationLabel: "도시 또는 랜드마크",
    locationPlaceholder: "예: 상하이 타워, 시부야, 명동…",
    dateLabel: "보관 날짜",
    actionLabel: "검색",
  },
  mapSection: {
    title: "도시 여행자를 위한 커버리지",
    subtitle: "도시를 탭하면 핵심 위치를 미리 볼 수 있습니다.",
    callout: "모든 마커는 인증된 Lockerlink 지점입니다.",
    exploreLabel: "도시 가이드 보기",
    cities: [
      {
        id: "shanghai",
        name: "상하이",
        headline: "외탄에서 푸둥까지 2호선 전역 커버",
        description: "지하철 허브, 비즈니스 지구, 디즈니까지 보관함을 배치해 일정을 유연하게.",
        highlight: "Tip: 난징루 지점은 오전 10시 전에 마감되니 미리 예약하세요.",
      },
      {
        id: "tokyo",
        name: "도쿄",
        headline: "야마노테선 전역을 끊김 없이 이동",
        description: "신주쿠·긴자 컨시어지가 이른 체크인과 늦은 체크아웃을 지원합니다.",
        highlight: "자동 배송을 켜면 짐이 바로 호텔 로비로 도착합니다.",
      },
      {
        id: "seoul",
        name: "서울",
        headline: "홍대의 밤을 두 손 자유롭게",
        description: "야시장 근처에 맡기는 동안 배송 기사가 인천공항이나 숙소로 운반합니다.",
        highlight: "익스프레스 배송 평균 소요 시간은 90분입니다.",
      },
    ],
  },
  howItWorks: {
    title: "Lockerlink 이용 방법",
    subtitle: "세 단계면 가벼운 여행이 완성됩니다.",
    steps: [
      {
        id: "search",
        title: "검색하고 선택",
        description: "일정에 맞는 보관함 크기나 배송 시간을 고릅니다.",
      },
      {
        id: "confirm",
        title: "확인 및 결제",
        description: "Apple Pay, 카드 등으로 결제하고 즉시 액세스 코드를 받습니다.",
      },
      {
        id: "enjoy",
        title: "맡기고 즐기기",
        description: "몇 초 만에 보관하거나 배송 기사가 인수해 여행에 집중할 수 있습니다.",
      },
    ],
    footnote: "모든 예약에 보험, 지연 보장, 24시간 지원이 포함됩니다.",
  },
  testimonials: {
    title: "여행자와 파트너가 함께 선택",
    subtitle: "매주 Lockerlink를 이용하는 사람들의 이야기입니다.",
    entries: [
      {
        id: "emma",
        name: "에마 사토",
        role: "프로덕트 디자이너",
        location: "일본 도쿄",
        quote: "역 근처에 짐을 맡기고 커피를 들고 바로 도시 탐험을 시작합니다.",
        rating: 5,
        image: "/city_imgs/photo-1477959858617-67f85cf4f1df.avif",
      },
      {
        id: "li-wei",
        name: "리웨이",
        role: "호텔 운영 책임자",
        location: "중국 상하이",
        quote: "피크 시간에도 로비가 한결 여유로워졌고, 고객 만족도도 높아졌습니다.",
        rating: 5,
        image: "/city_imgs/swapnil-bapat-sJ7pYyJFyuA-unsplash.jpg",
      },
      {
        id: "minji",
        name: "박민지",
        role: "여행 블로거",
        location: "대한민국 서울",
        quote: "짐을 배송 기사에게 맡기면 하루 종일 콘텐츠 제작에 집중할 수 있어요.",
        rating: 5,
        image: "/city_imgs/berkay-gumustekin-hRg1KL4-AUE-unsplash.jpg",
      },
    ],
  },
  partnerBanner: {
    title: "Lockerlink로 새로운 수익원을",
    subtitle: "호텔, 쇼핑몰, 교통 허브가 며칠 만에 스마트 보관함을 구축합니다.",
    primaryCta: {
      label: "팀과 상담하기",
      href: "/partner",
    },
    secondaryCta: {
      label: "파트너 자료 받기",
      href: "#download-partner-kit",
    },
  },
};

const koreanPages: TranslationContent["pages"] = {
  home: {
    meta: {
      title: "Lockerlink | 가볍게 여행하고 똑똑하게 보관하기",
      description: "아시아 주요 도시에서 이용 가능한 스마트 보관과 수하물 배송 서비스.",
    },
    hero: {
      eyebrow: "Lockerlink",
      title: "가볍게 여행하고 걱정 없이 보관하세요",
      subtitle: "1분 안에 보관 또는 배송을 예약하세요.",
      description: "스마트 보관함과 보험이 포함된 배송, 호텔 파트너가 여행을 더욱 편하게 만듭니다.",
      primaryCta: {
        label: "보관 예약",
        href: "/storage",
        eventId: "home_store_click",
      },
      secondaryCta: {
        label: "배송 요청",
        href: "/delivery",
        eventId: "home_transfer_click",
      },
      highlights: [
        { label: "서비스 도시", value: "36" },
        { label: "평균 처리", value: "45초" },
        { label: "고객 평점", value: "4.9 / 5" },
      ],
      backgroundImages: englishPages.home.hero.backgroundImages,
    },
  },
  storage: {
    meta: {
      title: "Lockerlink 보관 | 스마트 보관함",
      description: "24시간 운영, CCTV 보안, 보험 포함으로 언제든 안심하고 맡기세요.",
    },
    hero: {
      eyebrow: "보관 서비스",
      title: "도착 즉시 맡기고 바로 이동",
      subtitle: "맞춤 크기를 선택하고 터치 한 번으로 개방, 원격 연장까지 지원합니다.",
      description: "연중무휴 운영과 보안 감시, 여행자 보험이 기본입니다.",
      primaryCta: {
        label: "보관함 찾기",
        href: "#locker-search",
        eventId: "storage_primary_click",
      },
      secondaryCta: {
        label: "요금 보기",
        href: "#services",
        eventId: "storage_secondary_click",
      },
      highlights: [
        { label: "평균 개방", value: "12초" },
        { label: "보험 한도", value: "¥5,000" },
        { label: "가동률", value: "99.8%" },
      ],
      backgroundImages: englishPages.storage.hero.backgroundImages,
    },
  },
  delivery: {
    meta: {
      title: "Lockerlink 배송 | 보험 포함 수하물 이동",
      description: "실시간 추적과 보험이 포함된 배송으로 공항·호텔·숙소를 이어줍니다.",
    },
    hero: {
      eyebrow: "배송 서비스",
      title: "짐은 이동하고, 당신은 순간을 즐기세요",
      subtitle: "실시간 추적과 보험이 포함된 배송을 예약하세요.",
      description: "공항과 호텔, 자택 사이의 매끄러운 인도를 미리 계획할 수 있습니다.",
      primaryCta: {
        label: "배송 예약",
        href: "#locker-search",
        eventId: "delivery_primary_click",
      },
      secondaryCta: {
        label: "노선 보기",
        href: "#map",
        eventId: "delivery_secondary_click",
      },
      highlights: [
        { label: "보장 시간", value: "60분" },
        { label: "배송 파트너", value: "480+" },
        { label: "정시율", value: "99.6%" },
      ],
      backgroundImages: englishPages.delivery.hero.backgroundImages,
    },
  },
  partner: {
    meta: {
      title: "Lockerlink 파트너 | 유휴 공간 수익화",
      description: "호텔, 쇼핑몰, 역이 Lockerlink로 스마트 보관과 배송 서비스를 도입해 수익을 높입니다.",
    },
    hero: {
      eyebrow: "파트너",
      title: "남는 공간을 대표 서비스로",
      subtitle: "호텔·쇼핑몰·역이 고객 만족과 수익을 동시에 높이고 있습니다.",
      description: "락커 설치, 직원 교육, 분석 도구까지 며칠 만에 지원합니다.",
      primaryCta: {
        label: "상담 예약",
        href: "#partner-banner",
        eventId: "partner_primary_click",
      },
      secondaryCta: {
        label: "사례 보기",
        href: "#testimonials",
        eventId: "partner_secondary_click",
      },
      highlights: [
        { label: "매출 증가", value: "+28%" },
        { label: "도입 속도", value: "72시간" },
        { label: "NPS 향상", value: "+18" },
      ],
      backgroundImages: englishPages.partner.hero.backgroundImages,
    },
  },
  account: {
    meta: {
      title: "Lockerlink 계정 | 예약 통합 관리",
      description: "보관 연장, 배송 추적, 동행자 공유, 멤버 혜택까지 한 계정으로 관리하세요.",
    },
    hero: {
      eyebrow: "내 계정",
      title: "모든 보관과 배송을 한눈에",
      subtitle: "예약을 연장하고 접근 권한을 공유하며 실시간으로 알림을 받으세요.",
      description: "Lockerlink가 여행자, 비서, 가족을 기기 간에 연결합니다.",
      primaryCta: {
        label: "로그인",
        href: "#locker-search",
        eventId: "account_primary_click",
      },
      secondaryCta: {
        label: "계정 만들기",
        href: "#services",
        eventId: "account_secondary_click",
      },
      highlights: [
        { label: "활성 회원", value: "120K+" },
        { label: "평균 절감", value: "22%" },
        { label: "응답 속도", value: "<30초" },
      ],
      backgroundImages: englishPages.account.hero.backgroundImages,
    },
  },
};

const ko: TranslationContent = {
  languageName: "한국어",
  analytics: en.analytics,
  navigation: {
    home: "홈",
    storage: "보관 서비스",
    delivery: "배송 서비스",
    partner: "파트너",
    account: "내 계정",
  },
  footer: {
    about: "Lockerlink 소개",
    contact: "문의하기",
    privacy: "개인정보 처리방침",
    terms: "이용약관",
    partner: "파트너 신청",
    rights: "© 2024 Lockerlink. All rights reserved.",
    contactPhone: "+82 2 123 4567",
    contactMail: "kr@lockerlink.com",
  },
  partnerHighlight: {
    title: "남는 공간으로 새로운 수익을",
    subtitle: "호텔과 상업시설, 교통 허브가 Lockerlink로 며칠 만에 서비스를 구축합니다.",
    cta: "파트너 되기",
  },
  common: koreanCommon,
  pages: koreanPages,
};

export const translations: Record<Language, TranslationContent> = {
  en: en,
  zh: zh,
  ja: ja,
  ko: ko,
};

export const getTranslation = (language: Language): TranslationContent => translations[language] ?? translations.en;

export const getPageContent = (language: Language, page: PageId): SectionContent => {
  const translation = getTranslation(language);
  const fallback = translations.en;
  const pageConfig = translation.pages[page] ?? fallback.pages[page];

  return {
    hero: pageConfig.hero,
    featureSection: translation.common.featureSection,
    searchSection: translation.common.searchSection,
    mapSection: translation.common.mapSection,
    howItWorks: translation.common.howItWorks,
    testimonials: translation.common.testimonials,
    partnerBanner: translation.common.partnerBanner,
    meta: pageConfig.meta,
  };
};
