interface ISettings {
  title: string,
  showSettings: boolean,
  showTagViews: boolean,
  showSidebarLogo: boolean,
  fixedHeader: boolean,
  errorLog: string[]
  sidebarTextTheme: boolean,
  devServerPort: number,
  mockServerPort: number
}

const settings: ISettings = {
  title: 'Vue Typescript Admin',
  showSettings: true,
  showTagViews: true,
  fixedHeader: false,
  showSidebarLogo: false,
  errorLog: ['production'],
  sidebarTextTheme: true,
  devServerPort: 9527,
  mockServerPort: 9528
}

export default settings