// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
// import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import Member from 'mdi-material-ui/CrownOutline'
import Discuss from 'mdi-material-ui/ForumOutline'
// import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import ImageIcon from 'mdi-material-ui/ImageOutline'


const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Foto',
      icon: ImageIcon,
      path: '/photo'
    },
    {
      title: 'Pembayaran',
      icon: CurrencyUsd,
      path: '/payment'
    },
    {
      title: 'Ruang Diskusi',
      icon: Discuss,
      path: '/room_discuss'
    },
    {
      title: 'User',
      icon: AccountCogOutline,
      path: '/user'
    },
    {
      title: 'Member',
      icon: Member,
      path: '/member'
    },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
