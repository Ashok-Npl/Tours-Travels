exports.dashboard = (req, res) => {
  res.render('admin/dashboard', {
    pageTitle: 'Admin Dashboard | Veron Crest',
    activePage: 'admin'
  });
};
