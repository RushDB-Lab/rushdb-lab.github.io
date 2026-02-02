import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import type { Lang } from '../../../i18n';

export function getStaticPaths() {
  return [
    { params: { lang: 'zh' } },
    { params: { lang: 'en' } },
    { params: { lang: 'ja' } },
  ];
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;

  const posts = await getCollection('blog', ({ id, data }) => {
    return id.startsWith(`${lang}/`) && !data.draft;
  });

  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const titles: Record<Lang, string> = {
    zh: 'RushDB 博客',
    en: 'RushDB Blog',
    ja: 'RushDB ブログ',
  };

  const descriptions: Record<Lang, string> = {
    zh: 'RushDB 团队博客 - 数据库技术、竞赛经验分享',
    en: 'RushDB Team Blog - Database technology and competition experience sharing',
    ja: 'RushDB チームブログ - データベース技術と競技経験の共有',
  };

  return rss({
    title: titles[lang],
    description: descriptions[lang],
    site: context.site!,
    items: sortedPosts.map((post) => {
      const [, ...slugParts] = post.id.split('/');
      const slug = slugParts.join('/').replace(/\.md$/, '');
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${lang}/blog/${slug}/`,
        author: post.data.author,
        categories: [post.data.category, ...post.data.tags],
      };
    }),
  });
}
