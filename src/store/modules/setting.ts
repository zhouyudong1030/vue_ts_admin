import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import elementVariables from '@/style/element-variables.scss'
import defaultSettings from '@/settings'

export interface ISettingsState {
  theme: string,
  fixedHeader: boolean,
  showSettings: boolean,
  showTagViews: boolean,
  showSidebarLogo: boolean,
  sidebarTextTheme: boolean
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  public theme = elementVariables.theme
  public fixedHeader = defaultSettings.fixedHeader
  public showSettings = defaultSettings.showSettings
  public showTagViews = defaultSettings.showTagViews
  public showSidebarLogo = defaultSettings.showSidebarLogo
  public sidebarTextTheme = defaultSettings.sidebarTextTheme

  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public changeSettings(payload: { key: string, value: any }) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
