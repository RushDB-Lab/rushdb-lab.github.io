export type Lang = 'zh' | 'en' | 'ja';

export const languages: Record<Lang, string> = {
  zh: '🇨🇳 中文',
  en: '🇬🇧 English',
  ja: '🇯🇵 日本語',
};

export const defaultLang: Lang = 'zh';

export const ui = {
  zh: {
    nav: {
      about: '关于我们',
      achievements: '竞赛成就',
      projects: '项目作品',
      members: '团队成员',
      news: '相关报道',
      contact: '联系我们',
      blog: '博客',
      github: 'View Our Github',
      openMenu: '打开菜单',
      switchToLight: '切换到浅色模式',
      switchToDark: '切换到深色模式',
    },
    hero: {
      title: 'RushDB 无限进步',
      subtitle: '专注数据库技术的本科生竞赛团队',
      actions: {
        learnMore: '了解更多',
        openGithub: '访问 GitHub',
        viewProjects: '查看项目',
      },
      panel: {
        kicker: '系统级团队',
        title: '以数据库为核心，打造可验证的工程能力',
        body: '设计、优化、实现：从查询到系统，从赛场到开源。',
        metrics: {
          members: '成员',
          awards: '奖项',
          openSource: '开源',
        },
      },
    },
    about: {
      title: '团队简介',
      subtitle: '起源于竞赛，聚焦数据库系统工程',
      desc: '{brand} 由三位初创成员联合发起，长期聚焦数据库系统设计、查询优化与性能工程。团队坚持以赛促研、以研促用，在高强度竞赛与开源实践中持续验证技术方案与工程能力。',
      milestones: {
        meet: {
          time: '2024 · CSCC 数据库赛道',
          event: '三位初创成员在全国大学生计算机系统能力大赛（CSCC）数据库赛道首次结识。',
        },
        awards: {
          time: '2024 · 全国一等奖',
          event: '三人当时分属两支参赛队伍，均获全国一等奖，分别位列全国第 2 名与第 3 名。',
        },
        foundation: {
          time: '2024-09-23 · 团队成立',
          event: 'RushDB 于 2024 年 9 月 23 日正式成立，并以团队形态征战第四届 OceanBase 数据库大赛。',
        },
      },
      stats: {
        members: '团队成员',
        awards: '全国奖项',
        projects: '开源项目',
      },
    },
    achievements: {
      title: '竞赛成就',
      items: {
        db2025: {
          title: '2025 年全国大学生计算机系统能力大赛-数据库管理系统设计赛',
          result: '🥇 全国一等奖',
          desc: '系统级硬核赛道的正面战场：从架构到实现，从瓶颈定位到极限优化，全链路"把数据库做出来"。以全国一等奖收官，验证团队在系统设计、工程落地与性能打磨上的顶级战斗力。',
        },
        oceanbase2024: {
          title: '全国大学生计算机系统能力大赛暨第四届 OceanBase 数据库创新设计赛 (2024)',
          result: '🏆 全国第三（本科生第一）· 四川省第一名',
          desc: '在全国2600余名选手中脱颖而出，展现了团队在数据库技术方面的卓越实力',
        },
        db2024: {
          title: '2024 年全国大学生计算机系统能力大赛-数据库管理系统设计赛',
          result: '🥇 全国一等奖 ×2',
          desc: '霸榜全国第二，第三，证明了团队在数据库系统设计方面的专业能力',
        },
      },
    },
    projects: {
      title: '项目作品',
      miniob: {
        title: 'MiniOB 完善版',
        tags: {
          database: '数据库',
          openSource: '开源',
        },
        desc: '一个用于分析 SQL 查询性能的工具，提供了完整的数据库管理系统功能实现。基于 MiniOB 框架开发，实现了向量数据库功能，在第四届 OceanBase 数据库大赛中获得初赛第一名的优异成绩。',
        features: {
          optimization: '高性能查询优化',
          vector: '向量数据库支持',
          analysis: '性能分析工具',
        },
      },
      rucbase2025: {
        title: 'CSCC-DB-Rucbase-2025',
        tags: {
          database: '数据库',
          openSource: '开源',
        },
        desc: '2024 全国大学生计算机系统能力大赛数据库赛道全国一等奖作品，基于 RucBase 的数据库系统实现与性能优化。',
        features: {
          school: '队伍学校：成都理工大学',
          team: '队伍名称：RushDB',
          tpcc: 'TPC-C 测试结果：32,820 txns/min',
        },
      },
    },
    members: {
      title: '团队成员',
      nowAtLabel: '目前所在',
      mingTai: {
        name: 'Tai Ming（明泰）',
        school: '成都理工大学 26 届',
        major: '智能科学与技术',
        nowAt: '中国人民大学 · 数据库方向博士生',
        location: '四川省成都市',
      },
      huXin: {
        name: '胡鑫',
        school: '成都理工大学 26 届',
        major: '智能科学与技术',
        nowAt: '字节跳动 - 火山引擎',
        location: '四川省成都市',
      },
      wuYiMin: {
        name: '吴奕民',
        school: '沈阳工业大学 25 届',
        major: '计算机科学与技术',
        nowAt: 'Comming Soon',
        location: '辽宁省沈阳市',
      },
    },
    news: {
      title: '相关报道',
      items: {
        cdut: {
          title: '成都理工大学学生在第四届OceanBase数据库大赛中获得佳绩',
          source: '成都理工大学教务处',
          desc: '在第四届OceanBase数据库大赛中，我校RushDB团队表现出色，在激烈的竞争中脱颖而出，获得了优异的成绩。这一成就充分展现了我校学生在数据库技术领域的专业能力和创新精神。',
          tags: {
            t1: '数据库竞赛',
            t3: '获奖新闻',
          },
        },
        sina: {
          title: '第四届OceanBase数据库大赛：南科大、成都理工、西安电子科大等获奖',
          source: '新浪财经',
          desc: '2024全国大学生计算机系统能力大赛暨第四届OceanBase数据库大赛在北京落下帷幕。来自成都理工大学、沈阳工业大学的大三大四学生组成的RushDB团队获得了二等奖（第三名），这也是历届大赛以来本科生首次进入前三名。',
          tags: {
            t1: '全国大赛',
            t2: '二等奖',
            t3: '历史突破',
          },
        },
        bilibili: {
          title: 'RushDB在第四届OB大赛斩获一等奖',
          source: '哔哩哔哩',
          desc: '双非院校队伍首次闯入20强，创造历史性突破，荣获本科生一等奖（本科生第一名）。RushDB团队在激烈的竞争中脱颖而出，展现了非985/211院校学生在数据库技术领域的卓越实力。',
          tags: {
            t1: '双非突破',
            t2: '一等奖',
            t3: '本科生第一',
          },
        },
      },
    },
    contact: {
      title: '联系我们',
      subtitle: '加入我们的旅程',
      desc: '对 {brand} 感兴趣？想加入我们或寻求合作？我们欢迎所有对数据库技术充满热情的伙伴！',
      githubCta: '点击访问我们的 GitHub',
      wechatTitle: 'RushDB 官方公众号',
      redbookTitle: 'RushDB 官方小红书',
      qrHint: '扫码关注，获取最新动态',
    },
    footer: {
      copyright: '© 2024-{year} RushDB. All Rights Reserved.',
    },
    language: {
      zh: '🇨🇳 中文',
      en: '🇬🇧 English',
      ja: '🇯🇵 日本語',
    },
    a11y: {
      skipToContent: '跳转到主要内容',
      scrollProgress: '页面滚动进度',
      mainNavigation: '主导航',
      backToTop: '返回顶部',
      musicToggle: '播放/暂停背景音乐',
    },
    blog: {
      title: '博客',
      readMore: '阅读更多',
      publishedOn: '发布于',
      tags: '标签',
      category: '分类',
      allPosts: '所有文章',
      noPosts: '暂无文章',
      backToBlog: '返回博客',
      tableOfContents: '目录',
      relatedPosts: '相关文章',
      categories: {
        database: '数据库',
        competition: '竞赛',
        tutorial: '教程',
        news: '新闻',
        research: '研究',
      },
    },
  },
  en: {
    nav: {
      about: 'About Us',
      achievements: 'Achievements',
      projects: 'Projects',
      members: 'Team Members',
      news: 'Related News',
      contact: 'Contact Us',
      blog: 'Blog',
      github: 'View Our Github',
      openMenu: 'Open menu',
      switchToLight: 'Switch to Light Mode',
      switchToDark: 'Switch to Dark Mode',
    },
    hero: {
      title: 'RushDB, Unlimited Progress',
      subtitle: 'Undergraduate competition team focused on database technology',
      actions: {
        learnMore: 'Learn More',
        openGithub: 'Open GitHub',
        viewProjects: 'View Projects',
      },
      panel: {
        kicker: 'Systems Team',
        title: 'Database-first, engineering you can verify',
        body: 'Design, optimize, build: from query engines to open source.',
        metrics: {
          members: 'Members',
          awards: 'Awards',
          openSource: 'Open Source',
        },
      },
    },
    about: {
      title: 'Team Introduction',
      subtitle: 'Originating from Competition, Focused on Database Systems Engineering',
      desc: '{brand} was co-founded by three initial members and focuses on database system design, query optimization, and performance engineering. The team follows a competition-driven R&D approach, continuously validating technical solutions and engineering execution through top-tier contests and open-source practice.',
      milestones: {
        meet: {
          time: '2024 · CSCC Database Track',
          event: 'The three founding members first met in the database track of the National College Computer System Capability Competition (CSCC).',
        },
        awards: {
          time: '2024 · National First Prize',
          event: 'They competed on two separate teams, and both teams won National First Prize, ranking 2nd and 3rd nationwide.',
        },
        foundation: {
          time: '2024-09-23 · Team Founded',
          event: 'RushDB was formally established on September 23, 2024, and entered the 4th OceanBase Database Competition as a unified team.',
        },
      },
      stats: {
        members: 'Team Members',
        awards: 'National Awards',
        projects: 'Open Source Projects',
      },
    },
    achievements: {
      title: 'Competition Achievements',
      items: {
        db2025: {
          title: '2025 National College Computer System Capability Competition - Database Management System Design Competition',
          result: '🥇 National First Prize',
          desc: 'A hard-core, system-level track: architecture to implementation, bottleneck hunting to extreme optimization—building a DB end-to-end. Closed the season with a National First Prize, proving top-tier capability in system design, engineering execution, and performance tuning.',
        },
        oceanbase2024: {
          title: 'National College Computer System Capability Competition & 4th OceanBase Database Innovation Design Competition (2024)',
          result: '🏆 3rd Place Nationally (1st Among Undergraduates) · 1st Place in Sichuan Province',
          desc: 'Stood out among over 2,600 contestants nationwide, demonstrating the team\'s exceptional expertise in database technology',
        },
        db2024: {
          title: '2024 National College Computer System Capability Competition - Database Management System Design Competition',
          result: '🥇 National First Prize ×2',
          desc: 'Dominated the rankings with 2nd and 3rd place nationally, proving the team\'s professional capabilities in database system design',
        },
      },
    },
    projects: {
      title: 'Project Works',
      miniob: {
        title: 'MiniOB Enhanced Version',
        tags: {
          database: 'Database',
          openSource: 'Open Source',
        },
        desc: 'A tool for analyzing SQL query performance that provides complete database management system functionality. Developed based on the MiniOB framework, it implements vector database features and achieved first place in the preliminary round of the 4th OceanBase Database Competition.',
        features: {
          optimization: 'High-Performance Query Optimization',
          vector: 'Vector Database Support',
          analysis: 'Performance Analysis Tools',
        },
      },
      rucbase2025: {
        title: 'CSCC-DB-Rucbase-2025',
        tags: {
          database: 'Database',
          openSource: 'Open Source',
        },
        desc: 'National First Prize project in the 2024 National College Computer System Capability Competition (Database track), focused on implementation and performance optimization based on RucBase.',
        features: {
          school: 'School: Chengdu University of Technology',
          team: 'Team: RushDB',
          tpcc: 'TPC-C: 32,820 txns/min',
        },
      },
    },
    members: {
      title: 'Team Members',
      nowAtLabel: 'Current affiliation',
      mingTai: {
        name: 'Tai Ming (明泰)',
        school: 'Chengdu University of Technology, Class of 2026',
        major: 'Intelligent Science and Technology',
        nowAt: 'Ph.D. Student, Renmin University of China',
        location: 'Chengdu, Sichuan Province, China',
      },
      huXin: {
        name: 'Xin Hu',
        school: 'Chengdu University of Technology, Class of 2026',
        major: 'Intelligent Science and Technology',
        nowAt: 'ByteDance - Volcano Engine',
        location: 'Chengdu, Sichuan Province, China',
      },
      wuYiMin: {
        name: 'YiMin Wu',
        school: 'Shenyang University of Technology, Class of 2025',
        major: 'Computer Science and Technology',
        nowAt: 'Comming Soon',
        location: 'Shenyang, Liaoning Province, China',
      },
    },
    news: {
      title: 'Related News',
      items: {
        cdut: {
          title: 'CDUT Students Achieve Excellence in 4th OceanBase Database Competition',
          source: 'CDUT Academic Affairs Office',
          desc: 'In the 4th OceanBase Database Competition, our university\'s RushDB team performed excellently, standing out in fierce competition and achieving outstanding results. This achievement fully demonstrates our students\' professional capabilities and innovative spirit in the field of database technology.',
          tags: {
            t1: 'Database Competition',
            t3: 'Award News',
          },
        },
        sina: {
          title: '4th OceanBase Database Competition: SUSTech, CDUT, Xidian University and Others Win Awards',
          source: 'Sina Finance',
          desc: 'The 2024 National College Computer System Capability Competition and 4th OceanBase Database Competition concluded in Beijing. The RushDB team, composed of junior and senior students from Chengdu University of Technology and Shenyang University of Technology, won the second prize (third place), marking the first time undergraduates have entered the top three in the competition\'s history.',
          tags: {
            t1: 'National Competition',
            t2: 'Second Prize',
            t3: 'Historic Breakthrough',
          },
        },
        bilibili: {
          title: 'RushDB Wins First Prize in the 4th OB Competition',
          source: 'Bilibili',
          desc: 'First time for a non-985/211 university team to enter the top 20, achieving a historic breakthrough and winning the first prize for undergraduates (1st place among undergraduates). The RushDB team stood out in fierce competition, demonstrating the exceptional capabilities of students from non-985/211 universities in database technology.',
          tags: {
            t1: 'Non-985/211 Breakthrough',
            t2: 'First Prize',
            t3: '1st Among Undergraduates',
          },
        },
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Join Our Journey',
      desc: 'Interested in {brand}? Want to join us or seek collaboration? We welcome all partners who are passionate about database technology!',
      githubCta: 'Click to visit our GitHub',
      wechatTitle: 'RushDB Official WeChat Account',
      redbookTitle: 'RushDB Official Redbook',
      qrHint: 'Scan to follow for updates',
    },
    footer: {
      copyright: '© 2024-{year} RushDB. All Rights Reserved.',
    },
    language: {
      zh: '🇨🇳 中文',
      en: '🇬🇧 English',
      ja: '🇯🇵 日本語',
    },
    a11y: {
      skipToContent: 'Skip to main content',
      scrollProgress: 'Page scroll progress',
      mainNavigation: 'Main navigation',
      backToTop: 'Back to top',
      musicToggle: 'Toggle background music',
    },
    blog: {
      title: 'Blog',
      readMore: 'Read More',
      publishedOn: 'Published on',
      tags: 'Tags',
      category: 'Category',
      allPosts: 'All Posts',
      noPosts: 'No posts yet',
      backToBlog: 'Back to Blog',
      tableOfContents: 'Table of Contents',
      relatedPosts: 'Related Posts',
      categories: {
        database: 'Database',
        competition: 'Competition',
        tutorial: 'Tutorial',
        news: 'News',
        research: 'Research',
      },
    },
  },
  ja: {
    nav: {
      about: '概要',
      achievements: '実績',
      projects: 'プロジェクト',
      members: 'メンバー',
      news: '報道',
      contact: '連絡',
      blog: 'ブログ',
      github: 'GitHub',
      openMenu: 'メニューを開く',
      switchToLight: 'ライトモードに切替',
      switchToDark: 'ダークモードに切替',
    },
    hero: {
      title: 'RushDB、無限の進歩',
      subtitle: 'データベース技術に特化した学部生競技チーム',
      actions: {
        learnMore: '詳しく見る',
        openGithub: 'GitHub を開く',
        viewProjects: 'プロジェクトを見る',
      },
      panel: {
        kicker: 'システムチーム',
        title: 'データベースを核に、検証可能な工学力を',
        body: '設計・最適化・実装：クエリからシステムへ、競技からOSSへ。',
        metrics: {
          members: 'メンバー',
          awards: '受賞',
          openSource: 'OSS',
        },
      },
    },
    about: {
      title: 'チーム紹介',
      subtitle: '競技を起点に、データベースシステム工学へ',
      desc: '{brand}は3名の初創メンバーにより共同で立ち上げられ、データベースシステム設計・クエリ最適化・性能工学に注力しています。競技を研究開発の起点とし、ハイレベルな大会とOSS実践を通じて、技術方針と実装力を継続的に検証しています。',
      milestones: {
        meet: {
          time: '2024・CSCC データベース競技',
          event: '3名の初創メンバーは、全国大学生コンピュータシステム能力大会（CSCC）データベース競技で初めて出会いました。',
        },
        awards: {
          time: '2024・全国一等賞',
          event: '当時は2つの別チームとして出場し、いずれも全国一等賞を受賞。全国2位と3位を獲得しました。',
        },
        foundation: {
          time: '2024-09-23・チーム発足',
          event: 'RushDBは2024年9月23日に正式発足し、第4回 OceanBase データベース大会にチームとして参戦しました。',
        },
      },
      stats: {
        members: 'チームメンバー',
        awards: '全国賞',
        projects: 'オープンソースプロジェクト',
      },
    },
    achievements: {
      title: '競技成果',
      items: {
        db2025: {
          title: '2025年全国大学生コンピュータシステム能力大会-データベース管理システム設計競技',
          result: '🥇 全国一等賞',
          desc: 'システム級の本格舞台：設計から実装、ボトルネック解析から限界最適化まで、DB を一気通貫で作り切る。全国一等賞で締めくくり、設計・実装・性能チューニングの総合力を証明。',
        },
        oceanbase2024: {
          title: '全国大学生コンピュータシステム能力大会および第4回OceanBaseデータベース革新設計競技 (2024)',
          result: '🏆 全国第3位（学部生第1位）・四川省第1位',
          desc: '全国2600名以上の参加者の中で頭角を現し、データベース技術における卓越した実力を示しました',
        },
        db2024: {
          title: '2024年全国大学生コンピュータシステム能力大会-データベース管理システム設計競技',
          result: '🥇 全国一等賞 ×2',
          desc: '全国第2位、第3位でランキングを独占し、データベースシステム設計における専門能力を証明しました',
        },
      },
    },
    projects: {
      title: 'プロジェクト作品',
      miniob: {
        title: 'MiniOB 完全版',
        tags: {
          database: 'データベース',
          openSource: 'オープンソース',
        },
        desc: 'SQLクエリパフォーマンスを分析するツールで、完全なデータベース管理システム機能を提供します。MiniOBフレームワークをベースに開発され、ベクターデータベース機能を実装し、第4回OceanBaseデータベース大会の予選で第1位の優秀な成績を収めました。',
        features: {
          optimization: '高性能クエリ最適化',
          vector: 'ベクターデータベースサポート',
          analysis: 'パフォーマンス分析ツール',
        },
      },
      rucbase2025: {
        title: 'CSCC-DB-Rucbase-2025',
        tags: {
          database: 'データベース',
          openSource: 'オープンソース',
        },
        desc: '2024年全国大学生コンピュータシステム能力大会（データベース競技）全国一等賞の作品で、RucBase を基盤に実装と性能最適化を行いました。',
        features: {
          school: '所属大学：成都理工大学',
          team: 'チーム名：RushDB',
          tpcc: 'TPC-C 結果：32,820 txns/min',
        },
      },
    },
    members: {
      title: 'チームメンバー',
      nowAtLabel: '現在所属',
      mingTai: {
        name: 'Tai Ming（明泰）',
        school: '成都理工大学 26期',
        major: '知能科学技術',
        nowAt: '中国人民大学・博士課程（データベースシステム）',
        location: '中国四川省成都市',
      },
      huXin: {
        name: '胡鑫',
        school: '成都理工大学 26期',
        major: '知能科学技術',
        nowAt: 'ByteDance - Volcano Engine',
        location: '中国四川省成都市',
      },
      wuYiMin: {
        name: '吴奕民',
        school: '瀋陽工業大学 25期',
        major: 'コンピュータ科学技術',
        nowAt: 'Comming Soon',
        location: '中国遼寧省瀋陽市',
      },
    },
    news: {
      title: '関連報道',
      items: {
        cdut: {
          title: '成都理工大学の学生が第4回OceanBaseデータベース大会で優秀な成績を収める',
          source: '成都理工大学教務処',
          desc: '第4回OceanBaseデータベース大会において、本学のRushDBチームは優秀な成績を収め、激しい競争の中で際立った成果を上げました。この成果は、データベース技術分野における本学学生の専門能力と革新精神を十分に示しています。',
          tags: {
            t1: 'データベース競技',
            t3: '受賞ニュース',
          },
        },
        sina: {
          title: '第4回OceanBaseデータベース大会：南方科技大学、成都理工大学、西安電子科技大学などが受賞',
          source: '新浪財経',
          desc: '2024年全国大学生コンピュータシステム能力大会兼第4回OceanBaseデータベース大会が北京で閉幕しました。成都理工大学と瀋陽工業大学の3年生・4年生で構成されたRushDBチームが2等賞（3位）を獲得し、これは大会史上初めて学部生がトップ3に入った快挙です。',
          tags: {
            t1: '全国大会',
            t2: '2等賞',
            t3: '歴史的突破',
          },
        },
        bilibili: {
          title: 'RushDBが第4回OB大会で一等賞を獲得',
          source: 'ビリビリ',
          desc: '非985/211大学チームとして初めてトップ20入りを果たし、歴史的な突破を達成、学部生一等賞（学部生第1位）を獲得。RushDBチームは激しい競争の中で頭角を現し、非985/211大学の学生がデータベース技術分野で持つ卓越した実力を示しました。',
          tags: {
            t1: '非985/211突破',
            t2: '一等賞',
            t3: '学部生第1位',
          },
        },
      },
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: '私たちの旅に参加しませんか',
      desc: '{brand}に興味がありますか？参加や協力をお考えですか？ データベース技術に情熱を持つすべてのパートナーを歓迎します！',
      githubCta: 'GitHubにアクセス',
      wechatTitle: 'RushDB 公式微信公众号',
      redbookTitle: 'RushDB 公式小紅書',
      qrHint: 'QRコードでフォローして最新情報を入手',
    },
    footer: {
      copyright: '© 2024 - {year} RushDB. All Rights Reserved.',
    },
    language: {
      zh: '🇨🇳 中文',
      en: '🇬🇧 English',
      ja: '🇯🇵 日本語',
    },
    a11y: {
      skipToContent: 'メインコンテンツへスキップ',
      scrollProgress: 'ページスクロール進捗',
      mainNavigation: 'メインナビゲーション',
      backToTop: 'トップへ戻る',
      musicToggle: 'BGMの再生/一時停止',
    },
    blog: {
      title: 'ブログ',
      readMore: '続きを読む',
      publishedOn: '公開日',
      tags: 'タグ',
      category: 'カテゴリー',
      allPosts: 'すべての記事',
      noPosts: '記事がありません',
      backToBlog: 'ブログに戻る',
      tableOfContents: '目次',
      relatedPosts: '関連記事',
      categories: {
        database: 'データベース',
        competition: '競技',
        tutorial: 'チュートリアル',
        news: 'ニュース',
        research: '研究',
      },
    },
  },
} as const;
