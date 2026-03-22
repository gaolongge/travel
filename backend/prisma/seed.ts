import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const author = {
  id: 'author-1',
  name: '林小旅',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  bio: '一个热爱旅行的文艺青年，喜欢用文字记录旅途中的点滴感动。走过山川湖海，看过日出日落，依然对这个世界充满好奇。',
  location: '中国 · 杭州',
  weibo: 'https://weibo.com/traveler',
  wechat: 'travel_notes',
  instagram: 'https://instagram.com/travel_notes',
  email: 'hello@travelnotes.com',
};

const tags = [
  { id: 'tag-1', name: '日本', slug: 'japan', color: '#FF6B6B' },
  { id: 'tag-2', name: '西藏', slug: 'tibet', color: '#4ECDC4' },
  { id: 'tag-3', name: '自驾游', slug: 'road-trip', color: '#45B7D1' },
  { id: 'tag-4', name: '海边', slug: 'seaside', color: '#96CEB4' },
  { id: 'tag-5', name: '文化之旅', slug: 'culture', color: '#FFEAA7' },
  { id: 'tag-6', name: '美食探店', slug: 'food', color: '#DDA0DD' },
  { id: 'tag-7', name: '云南', slug: 'yunnan', color: '#98D8C8' },
  { id: 'tag-8', name: '古镇', slug: 'ancient-town', color: '#F7DC6F' },
];

const articles = [
  {
    id: 'article-1',
    title: '漫步京都，寻一场千年古韵',
    slug: 'walking-in-kyoto',
    excerpt: '漫步在京都的古寺与小巷，仿佛穿越时空，走进了一幅流动的水墨画。金阁寺的金碧辉煌、�的清幽雅致、花见小路的夜色阑珊...',
    content: `## 初遇京都

清晨的京都，薄雾笼罩着这座千年古都。从大阪关西机场乘坐特急列车，不到一个小时便抵达了京都站。

![京都风景](https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop)

## 金阁寺的晨光

金阁寺，又名鹿苑寺，是京都最著名的景点之一。当清晨的第一缕阳光洒在金碧辉煌的三层楼阁上，整个建筑仿佛在发光。

> "京都的美，在于它的不急不躁，仿佛时间在这里慢了下来。"

## 祗园的夜

傍晚时分，漫步在花见小路，运气好的话，可以看到赶场的艺伎。两旁的町屋，透着温暖的灯光，让人仿佛置身于江户时代。

### 实用信息

- **最佳季节**：春季（樱花）、秋季（红叶）
- **建议停留**：3-4天
- **交通**：购买一日公交券最划算

京都，值得你慢下来，细细品味。`,
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=500&fit=crop',
    readTime: 8,
    tagIds: ['tag-1', 'tag-5'],
  },
  {
    id: 'article-2',
    title: '西藏行记：在离天堂最近的地方',
    slug: 'journey-to-tibet',
    excerpt: '穿越可可西里，邂逅雪山与圣湖。在海拔5000米的地方，感受生命的渺小与伟大。布达拉宫的雄伟、纳木错的湛蓝、珠峰的壮丽...',
    content: `## 318国道的召唤

从成都出发，沿着318国道一路向西。这条被誉为"中国最美景观大道"的公路，每一步都是风景。

![西藏公路](https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=400&fit=crop)

## 翻越折多山

海拔4298米的折多山，是进入藏区的第一道门槛。稀薄的空气让每一个呼吸都变得珍贵，但山顶的风景让一切都值得。

### 纳木错的蓝

纳木错，藏语意为"天湖"。湖水蓝得不可思议，与远处的雪山相映成趣。站在湖边，仿佛天地之间只剩下这片蓝。

\`\`\`
海拔：4718米
面积：1920平方公里
最佳季节：5月-10月
\`\`\`

## 拉萨的阳光

抵达拉萨，强烈的阳光让人睁不开眼。布达拉宫巍然矗立在红山上，诉说着千年的沧桑。

西藏，是一个让人想一去再去的地方。`,
    coverImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=500&fit=crop',
    readTime: 12,
    tagIds: ['tag-2', 'tag-3'],
  },
  {
    id: 'article-3',
    title: '厦门：面朝大海，春暖花开',
    slug: 'xiamen-seaside',
    excerpt: '在鼓浪屿的小巷迷路，在环岛路吹海风。厦门，一座让人想慢下来的城市。文艺的小店、悠扬的琴声、温柔的海风...',
    content: `## 鼓浪屿的午后

从厦门国际邮轮中心乘船，不到20分钟便抵达鼓浪屿。这座没有机动车的小岛，保持着百年前的宁静。

![鼓浪屿](https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=400&fit=crop)

## 迷失在巷弄间

鼓浪屿的魅力在于它的巷弄。走在蜿蜒的石板路上，两旁是各式各样的老别墅，每一栋都有故事。

> "在这里，迷路是一种享受。"

## 环岛路的骑行

傍晚时分，租一辆自行车，沿着环岛路一路骑行。左手是大海，右手是绿树，微风拂面，无比惬意。

### 美食推荐

- **沙茶面**：厦门特色，汤头浓郁
- **海蛎煎**：外酥里嫩，鲜香可口
- **土笋冻**：口感独特，值得一试

厦门，是一座让人来了就不想走的城市。`,
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=500&fit=crop',
    readTime: 6,
    tagIds: ['tag-4', 'tag-6'],
  },
  {
    id: 'article-4',
    title: '大理：风花雪月的慢生活',
    slug: 'dali-slow-life',
    excerpt: '在洱海边发呆，在古城里漫步。大理，是一个可以让人忘记时间的地方。苍山的雪、洱海的月、上关的风、下关的花...',
    content: `## 洱海的清晨

清晨五点，洱海边已经站满了等待日出的人。当第一缕阳光洒在湖面上，整个世界都安静了下来。

![洱海日出](https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop)

## 古城的慢时光

大理古城，没有丽江的喧嚣，却有着独特的慵懒。人民路上的小店，每一家都值得停留。

### 苍山徒步

乘坐索道上山，然后徒步下山。沿途的风景如画，空气清新得让人想打包带走。

## 双廊的日落

傍晚的双廊，是欣赏日落的绝佳地点。坐在海边的咖啡馆里，看着太阳一点点沉入洱海，时光仿佛静止。

大理，是让人学会慢下来的地方。`,
    coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop',
    readTime: 7,
    tagIds: ['tag-7', 'tag-8'],
  },
  {
    id: 'article-5',
    title: '乌镇：小桥流水人家的江南梦',
    slug: 'wuzhen-water-town',
    excerpt: '摇橹船穿过石桥，灯笼倒映在水中。乌镇，一幅活着的江南水墨画。东栅的古朴、西栅的精致，让人流连忘返...',
    content: `## 西栅的夜

入夜后的西栅，灯笼亮起，整个水乡变得温柔起来。坐在河边的茶馆里，看游船来来往往，时光慢得像水一样。

![乌镇夜景](https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=400&fit=crop)

## 清晨的东栅

清晨的东栅，游客还未到来。老街上的早餐铺已经热气腾腾，本地人在河边洗衣服，一切都那么原生态。

### 必尝美食

- **白水鱼**：鲜嫩可口
- **红烧羊肉**：肥而不腻
- **定胜糕**：软糯香甜

## 坐摇橹船

坐在摇橹船上，听着船夫哼着小调，穿过一座座石桥，仿佛走进了古诗里的江南。

乌镇，是一个让人沉醉的地方。`,
    coverImage: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=500&fit=crop',
    readTime: 5,
    tagIds: ['tag-8', 'tag-5'],
  },
  {
    id: 'article-6',
    title: '富士山下：邂逅日本的浪漫',
    slug: 'mount-fuji-japan',
    excerpt: '在河口湖畔仰望富士山，在新仓山浅间公园拍摄明信片般的美景。春天的樱花、夏天的绿意、秋天的红叶、冬天的白雪...',
    content: `## 河口湖的倒影

河口湖是观赏富士山的最佳地点之一。清晨，湖面如镜，富士山的倒影清晰可见，这就是著名的"逆富士"。

![富士山](https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=400&fit=crop)

## 新仓山浅间公园

想要拍摄经典的富士山与五重塔同框的照片，就要来这里。爬上398级台阶，眼前的景色让人屏息。

> "富士山的美，在于它的完美对称，在于它的神圣庄严。"

### 实用信息

- **最佳观赏季节**：冬季（空气通透）
- **交通**：从东京乘坐富士急行线约2小时
- **住宿**：河口湖温泉酒店

## 箱根温泉

看完富士山，去箱根泡个温泉，是完美的组合。露天温泉，远眺富士山，无比惬意。

富士山，是日本之旅不可错过的风景。`,
    coverImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=500&fit=crop',
    readTime: 6,
    tagIds: ['tag-1', 'tag-5'],
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // 创建作者
  await prisma.author.upsert({
    where: { id: author.id },
    update: author,
    create: author,
  });
  console.log('✅ Author created');

  // 创建标签
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { id: tag.id },
      update: tag,
      create: tag,
    });
  }
  console.log('✅ Tags created');

  // 创建文章
  for (const article of articles) {
    const { tagIds, ...articleData } = article;
    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        ...articleData,
        tags: {
          deleteMany: {},
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
      create: {
        ...articleData,
        authorId: author.id,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
    });
  }
  console.log('✅ Articles created');

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
