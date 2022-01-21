import { Container, TabList, TabPanel, Tabs } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

const OverviewTabPage = dynamic(
  () => import('@/modules/dashboard/OverviewTabPage'),
)

import { css, useTheme } from '@emotion/react'

const StyledTab = dynamic(() => import('@/ui/components/StyledTab'))

import { LocalStoreProvider } from '@/lib/mobx/LocalStoreProvider'
import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { tabLabels } from '@/modules/dashboard/tabs'
import { useSyncTabStateWithRoute } from '@/modules/dashboard/useSyncTabStateWithRoute'
import { RoleIDs } from '@/modules/models/Role'

const TimesheetsTabPage = dynamic(
  () => import('@/modules/dashboard/TimesheetsTabPage'),
)

export const AdminDashboardPage = observer(function AdminDashboardPage(
  props: DashboardPageProps,
) {
  const theme = useTheme()

  const dashboardStore = useMobXStore(
    () =>
      new DashboardStore({
        role: RoleIDs.Employee,
        initialTabKey: props.tabKey,
      }),
  )

  useSyncTabStateWithRoute(
    () => dashboardStore.tabKey,
    dashboardStore.setTabKey,
  )

  return (
    <LocalStoreProvider localStore={dashboardStore}>
      <Container
        maxW="100%"
        css={css`
          min-width: 100vw;
          padding: 0;
        `}
      >
        <Tabs
          isLazy
          onChange={dashboardStore.setTab}
          index={dashboardStore.tabIndex}
          colorScheme="gray"
        >
          <TabList
            bg={'#fff'}
            shadow="none"
            px={8}
            borderBottom={`0.8px solid ${theme.colors.gray[300]}`}
          >
            {tabs.map((tab, i) => (
              <StyledTab
                isSelected={dashboardStore.tabIndex === i}
                id={tab.id}
                key={tab.id}
              >
                {tab.label}
              </StyledTab>
            ))}
          </TabList>
          <TabPanel padding={0}>
            <OverviewTabPage {...props} />
          </TabPanel>
          <TabPanel padding={0}>
            <TimesheetsTabPage {...props} />
          </TabPanel>
        </Tabs>
      </Container>
    </LocalStoreProvider>
  )
})

interface TabButtonProps {
  id: string
  label: string
}

const tabs: TabButtonProps[] = Object.entries(tabLabels).map(
  ([tabKey, tabLabel]) => ({ id: tabKey, label: tabLabel }),
)
