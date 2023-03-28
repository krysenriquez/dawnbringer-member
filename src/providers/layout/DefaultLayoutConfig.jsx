export const DefaultLayoutConfig = {
  main: {
    type: 'default',
    darkSkinEnabled: true,
    primaryColor: '#009EF7',
    pageBgWhite: false,
    body: {
      simple: {
        background: {
          backgroundImage: '/media/bg/le-reussi.png',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'center center',
        },
      },
      main: {
        background: {
          backgroundImage: '/media/bg/header-le-reussi.png',
          repeat: 'no-repeat',
          size: 'auto 450px',
          position: 'center top',
        },
      },
    },
  },
  app: {
    loader: {
      display: false,
      type: 'default', // Set default|spinner-message|spinner-logo to hide or show page loader
    },
    scrolltop: {
      display: true,
    },
    header: {
      display: true, // Set true|false to show or hide Header
      width: 'fluid', // Set fixed|fluid to change width type
      left: 'menu',
      fixed: {
        desktop: true, // Set true|false to set fixed Header for desktop mode
        tabletAndMobile: true, // Set true|false to set fixed Header for tablet and mobile modes
      },
      menu: {
        display: true,
        iconType: 'svg',
      },
      container: {
        width: 'fluid',
        class: 'd-flex align-items-stretch justify-content-between container-xxl',
        mobileToggle: {
          class: 'd-flex align-items-center d-block d-lg-none ms-n3',
        },
        headerLogo: {
          class: 'd-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15',
        },
        navbar: {
          class: 'd-flex align-items-stretch justify-content-between flex-lg-grow-1',
          menu: {
            class: 'align-items-stretch',
            attributes: {
              'data-drawer': 'true',
              'data-drawer-name': 'app-header-menu',
              'data-drawer-activate': '{default: true, lg: false}',
              'data-drawer-overlay': 'true',
              'data-drawer-width': "{default:'200px', '300px': '250px'}",
              'data-drawer-direction': 'start',
              'data-drawer-toggle': '#app_header_menu_mobile_toggle',
            },
          },
          topbar: {
            class: 'flex-lg-grow-1 justify-content-end',
          },
        },
      },
    },
    sidebar: {
      display: false,
      class: 'flex-column',
      push: {
        header: true,
        toolbar: true,
        footer: true,
      },
      drawer: {
        enabled: true,
        attributes: {
          'data-drawer': 'true',
          'data-drawer-name': 'app-sidebar',
          'data-drawer-activate': '{default: true, lg: false}',
          'data-drawer-overlay': 'true',
          'data-drawer-direction': 'start',
          'data-drawer-toggle': '#app_sidebar_toggle',
        },
      },
      fixed: {
        desktop: true,
      },
      minimize: {
        desktop: {
          enabled: true,
          default: false,
          hoverable: true,
        },
      },
      menu: {
        iconType: 'font',
        attributes: {
          'data-scroll': 'true',
          'data-scroll-activate': 'true',
          'data-scroll-height': 'auto',
          'data-scroll-dependencies': '#app_sidebar_logo',
          'data-scroll-wrappers': '#app_sidebar_navs',
          'data-scroll-offset': '5px',
          'data-scroll-save-state': 'true',
        },
      },
    },
    toolbar: {
      display: true,
      width: 'fluid',
      class: 'py-5 py-lg-15',
      container: {
        class: 'd-flex align-items-stretch container-xxl',
        wrapper: {
          class: 'd-flex flex-stack flex-wrap gap-4 w-100',
        },
      },
      fixed: {
        desktop: true,
        tabletAndMobileMode: false,
      },
    },
    content: {
      class: 'd-flex flex-column-fluid align-items-start container-xxl ',
      container: {
        class: 'content flex-row-fluid',
      },
    },
    footer: {
      class: '',
      container: {
        width: 'fluid',
        class:
          'container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3 justify-content-end container-xxl',
      },
    },
    pageTitle: {
      display: true,
      breadCrumbs: true,
      description: true,
      responsive: true,
      responsiveBreakpoint: 'lg',
      responsiveTarget: '#kt_toolbar_container', // Responsive target selector
    },
    engage: {
      display: false,
    },
  },
}
