const routes = {
  client: () => '/',
  profile: (userId = ':userId(\\d+)') => `/ru/account/${userId}`,
  home: () => '/dashboard',
  signin: () => '/dashboard/signin',
  users: () => '/dashboard/users',
  userPage: (userId = ':userId(\\d+)') => `/dashboard/users/${userId}`,
  userCreate: () => '/dashboard/users/create',
  seasons: () => '/dashboard/seasons',
  seasonPage: (seasonId = ':seasonId(\\d+)') =>
    `/dashboard/seasons/${seasonId}`,
  seasonCreate: () => '/dashboard/seasons/create',
  contestPage: (seasonId = ':seasonId(\\d+)', contestId = ':contestId(\\d+)') =>
    `/dashboard/seasons/${seasonId}/contests/${contestId}`,
  contestCreate: (seasonId = ':seasonId(\\d+)') =>
    `/dashboard/seasons/${seasonId}/contests/create`,
  nominations: (seasonId = ':seasonId(\\d+)', contestId = ':contestId(\\d+)') =>
    `/dashboard/seasons/${seasonId}/contests/${contestId}/nominations`,
  nominationPage: (
    seasonId = ':seasonId(\\d+)',
    contestId = ':contestId(\\d+)',
    nominationId = ':nominationId(\\d+)'
  ) =>
    `/dashboard/seasons/${seasonId}/contests/${contestId}/nominations/${nominationId}`,
  nominationCreate: (
    seasonId = ':seasonId(\\d+)',
    contestId = ':contestId(\\d+)'
  ) =>
    `/dashboard/seasons/${seasonId}/contests/${contestId}/nominations/create`,
  articles: () => '/dashboard/article',
  articlePage: (articleId = ':articleId(\\d+)') =>
    `/dashboard/article/${articleId}`,
  articleCreate: () => '/dashboard/article/create',
  sponsorsPages: () => '/dashboard/sponsors-pages',
  sponsorTypes: () => '/dashboard/sponsor-types',
  sponsorTypePage: (sponsorTypeId = ':sponsorTypeId(\\d+)') =>
    `/dashboard/sponsor-types/${sponsorTypeId}`,
  sponsorTypeCreate: () => '/dashboard/sponsor-types/create',
  sponsors: () => '/dashboard/sponsors',
  sponsorPage: (sponsorId = ':sponsorId(\\d+)') =>
    `/dashboard/sponsors/${sponsorId}`,
  sponsorCreate: () => '/dashboard/sponsors/create',
  costs: () => '/dashboard/costs',
  costPage: (costId = ':costId(\\d+)') => `/dashboard/costs/${costId}`,
  costCreate: () => '/dashboard/costs/create',
  sections: () => '/dashboard/sections',
  sectionPage: (sectionId = ':sectionId(\\d+)') =>
    `/dashboard/sections/${sectionId}`,
  sectionCreate: () => '/dashboard/sections/create',
  works: () => '/dashboard/works',
  workPage: (workId = ':workId(\\d+)') => `/dashboard/works/${workId}`,
  reports: () => '/dashboard/reports',
  reportPage: (reportId = ':reportId(\\d+)') =>
    `/dashboard/reports/${reportId}`,
  reportCreate: () => '/dashboard/reports/create',
  albums: () => '/dashboard/albums',
  albumPage: (albumId = ':albumId(\\d+)') => `/dashboard/albums/${albumId}`,
  albumCreate: () => '/dashboard/albums/create',
  places: () => '/dashboard/places',
  placePage: (placeId = ':placeId(\\d+)') => `/dashboard/places/${placeId}`,
  placeCreate: () => '/dashboard/places/create',
  rooms: () => '/dashboard/rooms',
  roomPage: (roomId = ':roomId(\\d+)') => `/dashboard/rooms/${roomId}`,
  roomCreate: () => '/dashboard/rooms/create',
  votingLogs: () => '/dashboard/voting-logs',
  workPreview: (id = ':id') => `/ru/works/${id}`,
  editableContent: () => '/dashboard/editable-content',
  personalArea: () => '/dashboard/personal-area',
};

export default routes;
