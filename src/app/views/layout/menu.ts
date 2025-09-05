import { MenuItem } from './menuModel';

export const MENU: MenuItem[] = [
  {
    label: 'User Management',
    icon: 'users',
    link: '/apps/user',
    // role: [1],
  },
  {
    label: 'Exam Conduction',
    icon: 'clipboard',
    link: '/apps/examconduction',
    // role: [1],
  },
  {
    label: 'Master Data',
    icon: 'folder',
    link: '/apps/master',
    // role: [1],
  },
  {
    label: 'Master Data Report',
    icon: 'list',
    link: '/apps/importhistory',
    // role: [1],
  },
  {
    label: 'Question Paper Management',
    icon: 'check-square',
    link: '/apps/assigntemplate',
    // role: [1],
  },
  {
    label: 'Answersheet import',
    icon: 'clipboard',
    link: '/apps/answersheet/import',
    // role: [1],
  },
  {
    label: 'Answersheet Allocation',
    icon: 'clipboard',
    link: '/apps/answersheet/consolidatedview',
    // role: [1],
  },
  {
    label: 'Answersheet Allocate Status',
    icon: 'clipboard',
    link: '/apps/answersheet',
    // role: [1],
  },
  {
    label: 'Assigned Question Papers',
    icon: 'list',
    link: '/apps/assigntemplate',
    // role: [2],
  },
  {
    label: 'Evaluation Assigned',
    icon: 'clipboard',
    link: '/apps/evaluationlist',
    // role: [2],
  },
  {
    label: 'Analysis Report',
    icon: 'clipboard',
    link: '/apps/reports',
    // role: [1],
  },
  {
    label: 'Final Exam Results',
    icon: 'clipboard',
    link: '/exportmarks',
    // role: [1],
  },
  {
    label: 'User Management',
    icon: 'users',
    link: '/apps/user',
    // role: [3],
  },
   {
    label: 'Question Paper Management',
    icon: 'check-square',
    link: '/apps/assigntemplate',
    // role: [3],
  },{
    label: 'Answersheet import',
    icon: 'clipboard',
    link: '/apps/answersheet/import',
    // role: [3],
  },
  {
    label: 'Answersheet Allocation',
    icon: 'clipboard',
    link: '/apps/answersheet/consolidatedview',
    // role: [3],
  },
  {
    label: 'Answersheet Allocate Status',
    icon: 'clipboard',
    link: '/apps/answersheet',
    // role: [3],
  },
  {
    label: 'Test',
    icon: 'clipboard',
    link: '/apps/test',
    // role: [1],
  }
];
