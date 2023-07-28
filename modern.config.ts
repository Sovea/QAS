import { defineConfig } from "@modern-js/doc-tools";
import path from "path";

function getI18nHelper(lang: "zh" | "en") {
  const cn = lang === "zh";
  // 默认语言为中文，如果是英文，需要加上 /en 前缀
  // The default language is Chinese, if it is English, you need to add the /en prefix
  const prefix = cn ? "" : "/en";
  const getLink = (str: string) => `${prefix}${str}`;
  const getText = (cnText: string, enText: string) => (cn ? cnText : enText);
  return { getText, getLink };
}

function getNavConfig(lang: "zh" | "en") {
  const { getText, getLink } = getI18nHelper(lang);
  return [
    {
      text: getText("首页", "Home"),
      link: getLink("/"),
    },
  ];
}

function getSidebarConfig(lang: "zh" | "en") {
  const { getText, getLink } = getI18nHelper(lang);
  // 注: 侧边栏配置可以嵌套，子菜单字段为 items
  // Note: The sidebar configuration can be nested, and the sub-menu field is items
  return {
    "/": [
      {
        text: getText("介绍", "Introduction"),
        link: getLink("/introduction"),
      },
      {
        text: getText("Web Dev", "Web Dev"),
        items: [
          {
            text: getText("开发效率", "Dev Efficiency"),
            items: [
              {
                text: getText("测试", "Test"),
                items: [
                  {
                    text: getText("Jest 单元测试", "Jest Unit Test"),
                    link: getLink("/web/efficiency/test/jest-tips"),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

export default defineConfig({
  doc: {
    root: path.join(__dirname, "docs"),
    title: "Sovea Dev Docs",
    description: "Questions And Solutions",
    logo: "https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/logo-2x-text-0104.png",
    icon: "https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/logo-1x-0104.png",
    // 默认语言
    // Default language
    lang: "zh",
    themeConfig: {
      footer: {
        // 页脚的文案
        // Footer text
        message: "© 2023 Sovea Inc. All Rights Reserved.",
      },
      // 不同语言的配置
      // Configuration for different languages
      locales: [
        {
          lang: "zh",
          title: "Sovea Dev Docs",
          description: "Questions And Solutions",
          nav: getNavConfig("zh"),
          sidebar: getSidebarConfig("zh"),
          // 语言切换按钮的文案
          // Language switch button text
          label: "简体中文",
        },
        // {
        //   lang: "en",
        //   title: "A awesome project",
        //   description: "A awesome project description",
        //   nav: getNavConfig("en"),
        //   sidebar: getSidebarConfig("en"),
        //   label: "English",
        // },
      ],
      socialLinks: [
        {
          icon: 'github',
          mode: 'link',
          content: 'https://github.com/Sovea',
        },
      ],
    },
  },
  plugins: ["@modern-js/doc-tools"],
});
