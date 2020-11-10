const Nav = {
  after_render: () => {

  },
  render: () => {
    return `
    <div class='nav-menu'>
        <ul>
          <li><a href='/#/user' >user</a></li>
          <li><a href='/#/category' >category</a></li>
          <li><a href='/#/brand' >Brand</a>
          <li><a href='/#/location' >Location</a>
          <li><a href='/#/stock' >Stock</a></li>
          <li><a href='/#/order' >Stock-out</a></li>
        </ul>  
        <div class='nav-logo'><a href='/#/'>Logo</a></div>
      </div>
    `
  }
};

export default Nav;