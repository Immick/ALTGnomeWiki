/* System */
import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { telegram, vk } from '../support/icons'
import { rewrites } from '../support/paths'
import { normalize } from '../support/utils'

/* Tools */

import vueDevTools from 'vite-plugin-vue-devtools'

/* Markdown */
import { default as createContainer } from '../theme/composables/customContainers'
import VitepressMarkdownTimeline from 'vitepress-markdown-timeline'
import markdownItKbd from 'markdown-it-kbd'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItImplicitFigures from 'markdown-it-implicit-figures'
import markdownItEmbed from 'markdown-it-html5-embed'
import markdownItConditionalRender from 'markdown-it-conditional-render'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

/* Syntaxises */
import languages from '../theme/syntaxes'

/* GitLog */
import UnoCSS from 'unocss/vite'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'

/* PagePropierties */
import {
  PageProperties,
  PagePropertiesMarkdownSection
} from '@nolebase/vitepress-plugin-page-properties/vite'
import {
  alignmentContainers,
  headTransformer,
  nolebaseGitChangelogOptions,
  vitepressSearchOptions
} from './plugins'

export const shared = defineConfig({
  title: 'ALT Gnome Wiki',
  titleTemplate: ':title — ALT Gnome Wiki',
  base: '',
  srcDir: './docs',
  sitemap: {
    hostname: 'https://alt-gnome.wiki/'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#62a0ea' }],
    ['meta', { name: 'yandex-verification', content: '6ef3a36c3d09e43e' }]
  ],
  vite: {
    plugins: [
      vueDevTools(),
      UnoCSS(),
      GitChangelog(nolebaseGitChangelogOptions.plugin),
      GitChangelogMarkdownSection(nolebaseGitChangelogOptions.pluginSections),
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: [],
        exclude: (_, { helpers }): boolean => {
          for (let page of ['index.md', 'wiki.md', 'contributions.md', 'about.md', 'games.md']) {
            if (helpers.idEndsWith(page)) return true
          }
          return false
        }
      })
    ],
    optimizeDeps: {
      exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client']
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-page-properties'
      ]
    },
    resolve: {
      alias: {
        '@vitepress/theme': fileURLToPath(
          new URL('../node_modules/vitepress/dist/client/theme-default', import.meta.url)
        )
      }
    }
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: vitepressSearchOptions
    },
    logo: { src: '/logo.png', width: 36, height: 36, alt: 'ALT Gnome Wiki' },
    socialLinks: [
      {
        icon: {
          svg: telegram
        },
        link: 'https://t.me/alt_gnome'
      },
      {
        icon: {
          svg: vk
        },
        link: 'https://vk.com/alt_gnome'
      },
      {
        icon: 'github',
        link: 'https://github.com/OlegShchavelev/ALTRegularGnomeWiki'
      }
    ],
    editLink: {
      pattern: 'https://github.com/OlegShchavelev/ALTRegularGnomeWiki/edit/main/docs/:path'
    },
    outline: {
      level: [2, 3]
    }
  },
  rewrites: rewrites,
  markdown: {
    languages,
    container: {
      tipLabel: 'Подсказка',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробнее'
    },
    config: (md) => {
      for (const [name, opts] of alignmentContainers) {
        md.use(...createContainer(name, opts, md))
      }
      md.use(markdownItKbd)
      md.use(markdownItTaskLists)
      md.use(VitepressMarkdownTimeline)
      md.use(markdownItImplicitFigures, {
        figcaption: 'title',
        copyAttrs: '^class$'
      })
      md.use(markdownItEmbed, {
        html5embed: {
          useImageSyntax: true // Enables video/audio embed with ![]() syntax (default)
        }
      })
      md.use(markdownItConditionalRender)
      md.use(tabsMarkdownPlugin)
    }
  },
  transformPageData: (pageData) => {
    if (pageData.filePath.split('/')[0] in Object.keys(headTransformer)) {
      pageData.frontmatter.head ??= []
      headTransformer[pageData.filePath.split('/')[0]].frontmatterHead(pageData, normalize)
      headTransformer[pageData.filePath.split('/')[0]].notHomeFrontmatter(pageData, normalize)
    } else {
      pageData.frontmatter.head ??= []
      headTransformer['root'].frontmatterHead(pageData, normalize)
      headTransformer['root'].notHomeFrontmatter(pageData, normalize)
    }
  }
})
