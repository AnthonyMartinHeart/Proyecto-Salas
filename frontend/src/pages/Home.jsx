import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{
        backgroundImage: "url('https://media.giphy.com/media/26n79dIbvDwfTNUaI/giphy.gif')",

        backgroundSize: 'cover',

        backgroundPosition: 'center',

        height: '100vh',

        display: 'flex',

        flexDirection: 'column',

        alignItems: 'center',

        justifyContent: 'center',

        color: 'white',
        
        textShadow: '2px 2px 4px #000'
      }}>
        <h1>Bienvenido Al Sistema De Reservas UBB</h1>
        <p>Esta es la página de inicio. Aquí puedes encontrar información sobre nuestras funcionalidades.</p>
      </div>
    </>
  )
}

export default Home
