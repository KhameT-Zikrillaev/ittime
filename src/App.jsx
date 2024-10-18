import { useState,useEffect } from 'react'
import './index.css'
import code from './assets/images/code-icon.svg'
import prog from './assets/images/prog-icon.svg'
import work from './assets/images/work-icon.svg'
import logo from './assets/images/logo-ittimeacademy-2.png'

import tick from './assets/images/tick-icon.svg'
function App() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedWork, setSelectedWork] = useState([]);
  const [activeModal, setActiveModal]= useState(true)
  const [activeModalSend, setActiveModalSend]= useState(false)
  const [username,setUsername] = useState('')
  const [usertelegram,setUserTelegram] = useState('')
  const [userphone,setUserphone] = useState('')

  const token = '6821529277:AAGNNfb4UV3FwUBKJsLo2tXFWp0Yy_2uyLU';
  const chatId = 5000750569;
  const handleUsernameChange = (event) => {
    setUsername(event.target.value); 
  };

  const handleUsertelegramChange = (event) => {
    setUserTelegram(event.target.value); 
  };

  const handleUserphoneChange = (event) => {
    const inputValue = event.target.value;
  const sanitizedValue = inputValue.replace(/\D/g, '');
  if (sanitizedValue.length <= 9) {
    setUserphone(sanitizedValue);
  }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~checkbox times~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const handleCheckboxChange = (event) => {
  //   const time = event.target.value;
  //   if (event.target.checked) {
  //     setSelectedTimes((prevSelectedTimes) => {
  //       const updatedTimes = [...prevSelectedTimes, time];
  //       return updatedTimes;
  //     });
  //   } else {
  //     setSelectedTimes((prevSelectedTimes) => {
  //       const updatedTimes = prevSelectedTimes.filter((t) => t !== time);
  //       return updatedTimes;
  //     });
  //   }
  // };
  const [isTime1Checked, setIsTime1Checked] = useState(false);
  const [isTime2Checked, setIsTime2Checked] = useState(false);
  const [isTime3Checked, setIsTime3Checked] = useState(false);
  const [isTime4Checked, setIsTime4Checked] = useState(false);
  useEffect(() => {
    const time1Checkbox = document.getElementById("time1");
    const time2Checkbox = document.getElementById("time2");
    const time3Checkbox = document.getElementById("time3");
    const time4Checkbox = document.getElementById("time4");

    // Устанавливаем обязательность для каждого чекбокса
    time1Checkbox.required = !isTime1Checked && !isTime2Checked && !isTime3Checked && !isTime4Checked;
    time2Checkbox.required = !isTime1Checked && !isTime2Checked && !isTime3Checked && !isTime4Checked;
    time3Checkbox.required = !isTime1Checked && !isTime2Checked && !isTime3Checked && !isTime4Checked;
    time4Checkbox.required = !isTime1Checked && !isTime2Checked && !isTime3Checked && !isTime4Checked;
  }, [isTime1Checked, isTime2Checked, isTime3Checked, isTime4Checked]);

  const handleCheckboxChange = (event) => {
    const time = event.target.value;
    if (event.target.checked) {
      setSelectedTimes((prevSelectedTimes) => [...prevSelectedTimes, time]);
    } else {
      setSelectedTimes((prevSelectedTimes) => prevSelectedTimes.filter((t) => t !== time));
    }

    // Обновляем состояние в зависимости от id
    switch (event.target.id) {
      case "time1":
        setIsTime1Checked(event.target.checked);
        break;
      case "time2":
        setIsTime2Checked(event.target.checked);
        break;
      case "time3":
        setIsTime3Checked(event.target.checked);
        break;
      case "time4":
        setIsTime4Checked(event.target.checked);
        break;
      default:
        break;
    }
  };



  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~checkbox work~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isTashkentChecked, setIsTashkentChecked] = useState(false);
  const [isOnlaynChecked, setIsOnlaynChecked] = useState(false);
  useEffect(() => {
      const tashkentCheckbox = document.getElementById("Tashkent");
      const onlaynCheckbox = document.getElementById("onlayn");
  
      tashkentCheckbox.required = !isOnlaynChecked;
      onlaynCheckbox.required = !isTashkentChecked;
  
  
  
  }, [isTashkentChecked, isOnlaynChecked]);
  const handleCheckboxChange2 = (event) => {
    const time = event.target.value;
    if (event.target.checked) {
        setSelectedWork((prevSelectedWork) => {
            const updatedWork = [...prevSelectedWork, time];
  
            return updatedWork;
        });
    } else {
        setSelectedWork((prevSelectedWork) => {
            const updatedWork = prevSelectedWork.filter((t) => t !== time);
            return updatedWork;
        });
    }
  
    if (event.target.id === "Tashkent") {
        setIsTashkentChecked(event.target.checked);
    } else if (event.target.id === "onlayn") {
        setIsOnlaynChecked(event.target.checked);
    }
  };


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~submit send~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``
  const submit = (event) => {
    event.preventDefault();
  
    if (userphone.length < 9) {
      alert('Telefon raqami kamida 9 ta raqamdan iborat bo\'lishi kerak.');
      return;
    }
    
 
    const fullMessage = `Name: ${username}, telephone: ${userphone}, Telegram : ${usertelegram}, Work:${selectedWork} Times:${selectedTimes}`;
    console.log(fullMessage);
  

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fullMessage}`)
      .then(response => response.json())
      .then(data => {
        setUsername('');
        setUserphone('');
        setUserTelegram('');
        setSelectedWork('');
        setSelectedTimes([]);
        event.target.reset();
        setActiveModalSend(true)
        setTimeout(()=>{
          setActiveModalSend(false)
        },1000)
      })
      .catch(error => {
        console.error('Ошибка при отправке сообщения:', error);
      });
  };
  return (
    <>
{/* ~~~~~~~~~~~~~~~~~~~~~~ modal window~~~~~~~~~~~~~~~~~ */}
    <div className={`modal w-full bg-black bg-opacity-45 mt-[-100%] flex p-2 justify-center items-center h-dvh fixed z-[99] 
    ${activeModal ? 'modal-animation-active' : 'modal-animation-nonactive'}`}>
     <div className="modal-items rounded-xl flex flex-col gap-2  py-8 px-2 p480:px-10 bg-white max-w-[500px] w-full">
      <h3 className='text-black   p480:text-[24px] text-center'>Siz Toshkent shahrida doimiy yashaysizmi?</h3>
      <button className='p-3 rounded-full border border-red-400 max-w-[300px] w-full mx-auto bg-white hover:bg-gray-200 hover:border-gray-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg' onClick={() => setActiveModal(false)}>Ha toshkent shahrida yashayman!</button>
     
  <a href="https://t.me/it_time" className='p-3 rounded-full border text-center border-red-400 max-w-[300px] w-full mx-auto bg-white hover:bg-gray-200 hover:border-gray-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'>Yo'q, boshqa shaharda yashayman!</a>

     </div>
    </div>
    {/* ~~~~~~~~~~~~~~~~~~~~~~modal send~~~~~~~~~~~~~~~~~~~~~~~ */}
    {activeModalSend && <div className={` w-full bg-black bg-opacity-45 flex p-2 justify-center items-center h-dvh fixed z-[99] 
    `}>
     <div className="modal-items rounded-xl flex justify-center items-center p480:px-10 ">
      <img className='w-[200px] ' src={tick} alt="" />
     </div>
    </div>
    }
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~content~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <div className='wrapper w-full h-[100dvh] flex  flex-col p992:flex-row'>



   {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~left-content~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <div className="left-content flex flex-col gap-2  p480:gap-5 justify-center items-center p992:items-start p992:pl-10 w-full  py-16 p992:w-[65%]  p992:h-screen clip-path-custom">
          <div><img className='max-w-[200px] p1200:max-w-[300px] h-auto p-2 mt-[-50px] p768:mt-0 w-full' src={logo} alt="" /></div>
          <div className='flex gap-4 items-center'><img className='w-16 p992:w-20' src={work} alt="" />
          <span className='text-[18px] p480:text-[24px] p992:text-[32px] text-white font-semibold font-serif text-animated'>
          Dasturlashni<br />o'rganmoqchimisiz?
            </span>
           </div>
          <ul className='flex flex-col  px-2 p480:px-0 gap-2 text-white font-semibold mt-[10px] p992:mt-[20px]'>
          <h2 className=' text-[26px] font-semibold mb-2'>Bizda qulayliklar:</h2>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='w-6' src={code} alt="" />Senior darajadagi ustozlar</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='w-6' src={code} alt="" />Real loyihalarda amaliyot</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='w-6' src={code} alt="" />Pullik loyihalarda ishtirok</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='w-6' src={code} alt="" />Startup uchun investitsiya imkoniyati</li>

          </ul>

          <div className='flex gap-2 items-center'><img className='ml-2 w-16' src={prog} alt="" /><p className='text-prof text-white text-[16px] p992:text-[18px] mr-[0px] p1200:mr-[0px]'>Professional dasturchi bo'lmoqchi bo'lsangiz <br/> hoziroq bizga qo'shiling!</p></div>

        </div>
    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~right-content~~~~~~~~~~~~~~~~~~~~~~~~ */}     
        <div className="right-content w-full   p992:w-[35%] flex flex-col justify-center items-center px-2 mr-10">
             
             <form onSubmit={submit} className='flex flex-col gap-2 w-full mt-2' action="">
             <h3 className='text-[20px]  mx-auto w-[80%]  mt-10 p992:mt-0'>Bizning kurslar  <b>Toshkentga</b> <br/> kela olsangiz, iltimos, formani to'ldiring.</h3>
            <input required className='p-4 w-[80%] mx-auto rounded-xl outline-none border border-red-900' type="text" placeholder='ismingiz' onChange={handleUsernameChange} />
            <input required className='p-4 w-[80%] mx-auto rounded-xl outline-none border border-red-900' type="text" placeholder='Telegram' onChange={handleUsertelegramChange}/>
            <input required className='p-4 mx-auto w-[80%] rounded-xl outline-none border border-red-900' type="text" placeholder='998990000000' value={userphone}
              onInput={handleUserphoneChange}  />
            {/* <span className='text-center'>Bizning kursimiz Toshkent shaharda joylashgan.<br/>Agar aniq kelib o’qiy olsangiz, Toshkentni belgilang.</span> */}

            <div className="checkbox-content-first flex justify-center gap-2 mx-auto">
            <div className='flex items-center gap-1'>
            <input
                        id="Tashkent"
                        type="checkbox"
                        value="Toshkentga bora olaman"
                        onChange={handleCheckboxChange2}
                    />
                    <label htmlFor="Tashkent">Toshkentga bora olaman</label>
            </div>
            <div className='flex items-center gap-1'>
            <input
                        id="onlayn"
                        type="checkbox"
                        value="Onlayn"
                        onChange={handleCheckboxChange2}
                    />
                    <label htmlFor="onlayn">Onlayn</label>
            </div>

            </div>
            <span className='block w-[70%] mx-auto bg-red-500 h-[2px]'></span>
            <p className='text-lg font-semibold text-center'>Qaysi vaqtda qatnasha olasiz?</p>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~times~~~~~~~~~~~~~~~~~~~ */}
            <div className='checkbox-content-second mx-auto grid grid-cols-2 gap-2  justify-center text-[16px] font-semibold'>
            <div className='flex items-center gap-2 '>          
    <input  id="time1" type="checkbox" value="10:00 - 12:00" onChange={handleCheckboxChange} />
    <label htmlFor="time1">10:00 - 12:00</label>
  </div>

  <div className='flex items-center gap-2'>
    <input id="time2" type="checkbox" value="15:00 - 17:00" onChange={handleCheckboxChange} />
    <label htmlFor="time2">15:00 - 17:00</label>
  </div>

  <div className='flex items-center gap-2'>
    <input id="time3" type="checkbox" value="17:00 - 19:00" onChange={handleCheckboxChange} />
    <label htmlFor="time3">17:00 - 19:00</label>
  </div>

  <div className='flex items-center gap-2'>
    <input id="time4" type="checkbox" value="19:00 - 21:00" onChange={handleCheckboxChange} />
    <label htmlFor="time4">19:00 - 21:00</label>
  </div>
            </div>
      <button type="submit" className='bg-red-500 p-4 w-[80%] mx-auto mt-1 p1200:mt-2 rounded-xl text-yellow-300 font-semibold transition transform hover:scale-105 hover:bg-red-600 hover:text-yellow-400 animate-text-pulse duration-500'>
  Yuborish
</button>
   
               </form>

         </div>  
      </div>

     

    </>
  )
}

export default App
