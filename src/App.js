import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import Info from './Info/Info';
import About from './About/About';
import Services from './Services/Services';
import Calculator from './Calculator/Calculator';
import Contacts from './Contacts/Contacts';
import Gallery from './Gallery/Gallery';
import Blogs from './Blogs/Blogs';
import Blog from './Blog/Blog';
import AdminServices from './Admin/AdminServices/AdminServices';
import AdminExamples from './Admin/AdminExamples/AdminExamples';
import AdminBlog from './Admin/AdminBlog/AdminBlog';

const router = createBrowserRouter([
  {
  path: '/',
  element: <Layout />,
  children: [
    {
    path: '/',
    element: <Info />,
    },
    {
    path: '/about',
    element: <About />,
    },
    {
    path: '/services',
    element: <Services />,
    },
    {
    path: '/calculate',
    element: <Calculator />,
    },
    {
    path: '/contacts',
    element: <Contacts />,
    },
    {
    path: '/gallery',
    element: <Gallery />,
    },
    {
    path: '/blogs',
    element: <Blogs />,
    },
    {
    path: '/blogs/:id',
    element: <Blog />,
    },
  ],
  },
  {
    path: '/admin/services',
    element: <AdminServices />,
  },
  {
    path: '/admin/examples',
    element: <AdminExamples />,
  },
  {
    path: '/admin/blogs',
    element: <AdminBlog />,
  },
]);

function App() {
  return (
  <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;