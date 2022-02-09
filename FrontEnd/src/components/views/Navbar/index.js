import '../Navbar/new.css';

const Navbar = () => {
  
  const logout = () => {
    localStorage.clear();
    //navigate("/login", {replace: true});
    window.location.reload();
  }

return(
  <div className="navbar">
    <a className="active" href="/home"><i className="fa fa-fw fa-home"></i> Inicio</a> 
    <a href="/users"><i className="fa fa-fw fa-user"></i> Utilizadores</a> 
    <a href="/vehicles"><i className="fa fa-fw fa-car"></i> Veículos</a> 
    <a href="/trips"><i className="fa fa-fw fa-map"></i> Viagens</a>
    <a href="/about"><i className="fa fa-fw fa-info"></i>Sobre nós</a>
    <a href="/login" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> Terminar sessão</a>
  </div>
)
}

export default Navbar;


