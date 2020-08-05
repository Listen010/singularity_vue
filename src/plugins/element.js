import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Footer,
  Aside,
  Main,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Drawer,
  MessageBox,
  Loading,
  Select,
  Option,
  Divider,
  Collapse,
  CollapseItem,
  Avatar,
  Tabs,
  TabPane

} from 'element-ui'

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Select)
Vue.use(Option)
Vue.use(Drawer)
Vue.use(Loading)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Main)
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
