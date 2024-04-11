import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  };

  const handleSubmit = (e) => {
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact-form', ...data }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  const handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  return (
    <>
      <Head>
        <title>Forms App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <p>Forms Example</p>
        <form name='contact-form' method='post' onSubmit={handleSubmit}>
          <input type='hidden' name='form-name' value='contact' />
          <p>
            <label>
              Your Name: <input type='text' name='name' />
            </label>
          </p>
          <p>
            <label>
              Your Email: <input type='email' name='email' />
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name='message'></textarea>
            </label>
          </p>
          <p>
            <button type='submit'>Send</button>
          </p>
        </form>
      </main>
    </>
  );
}