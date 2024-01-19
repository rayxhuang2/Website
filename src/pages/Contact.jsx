import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: ''});
  const [isLoading, setIsLoading] = useState(false);

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  };
  
  const handleSubmit =(e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Emili",
        from_email: form.email,
        to_email: 'emiliyang.work@gmail.com',
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        setIsLoading(false);
        showAlert({
          show: true,
          text: "Thank you for your message!",
          type: "success",
        });

        setTimeout(() => {
          hideAlert();
          setForm({
            name: "", email: "", message: "", });
        }, [3000]);
      
      // setForm({ name: '', email: '', message: ''});

    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      // TODO: Show error message
      showAlert({
        show: true,
        text: "Message sent failed!",
        type: "danger",
      });
    })
  };

  const handleFocus = () => {};
  const handleBlur = () => {};
  
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}
      {/* <Alert {...alert} /> */}

      <div className='flex-1 min-w-[50%] flex flex-col items-center'>
        <h1 className='head-text text-center'>Get in Touch</h1>

        <form
          className='w-full max-w-[560px] flex flex-col gap-7 mt-14 mx-auto'
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="John@email.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Message
            <textarea
              name='message'
              rows='5'
              className="textarea"
              placeholder=" "
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className='btn w-1/6 mx-auto'
            disable={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact