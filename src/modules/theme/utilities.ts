import { css } from '@emotion/react'

import { largerThan } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

export const utilities = css`
  .h-header {
    height: ${spacing(14)};
    ${largerThan('md')} {
      height: ${spacing(16)};
    }
  }

  .py-header-item {
    padding: ${spacing(5)};
    ${largerThan('md')} {
      padding: ${spacing(3)};
    }
  }

  .h-main {
    min-height: calc(100vh - 4rem);
    height: 100vh;
    min-width: 100vw;
  }

  .w-section {
    min-width: calc(100% - 3rem);
    max-width: calc(100% - 3rem);
  }

  .shadow-card {
    box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.24),
      0px 3px 8px -1px rgba(50, 50, 71, 0.05);
  }

  .icon-sizing {
    height: 1.125em;
    width: 1.125em;
  }

  .icon-sizing-md {
    height: 1.375em;
    width: 1.375em;
  }

  .icon-sizing-lg {
    height: 2.5em;
    width: 2.5em;
  }
`
