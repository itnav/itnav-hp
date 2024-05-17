export interface Route {
  path: string | ((...args: string[]) => string);
}

export const route = (<const>{
  top: {
    path: '/',
  },

  about: {
    path: '/about',
  },

  services: {
    path: '/services',
  },

  service: {
    path: (id: string) => `/services/${id}`,
  },

  members: {
    path: '/members',
  },

  member: {
    path: (id: string) => `/members/${id}`,
  },

  blogs: {
    path: '/blogs',
  },

  blog: {
    path: (id: string) => `/blogs/${id}`,
  },

  contact: {
    path: 'https://forms.gle/fB1XMDEJjVGGBGX76',
  },

  privacy: {
    path: '/privacy',
  },

  terms: {
    path: '/terms',
  },

  recruit: {
    path: 'https://recruit.itnav.co.jp',
  },

  recruitInfo: {
    path: 'https://recruit.itnav.co.jp/information',
  },

  recruitMemberInterview: {
    path: 'https://recruit.itnav.co.jp/interview',
  },

  recruitEngineer: {
    path: 'https://recruit.itnav.co.jp/information/engineer',
  },

  recruitSales: {
    path: 'https://recruit.itnav.co.jp/information/sales',
  },

  recruitBackOffice: {
    path: 'https://recruit.itnav.co.jp/information/backoffice',
  },

  facebook: {
    path: 'https://www.facebook.com/itnavishinomaki',
  },

  twitter: {
    path: 'https://twitter.com/itnav_',
  },
}) satisfies Record<string, Route>;
