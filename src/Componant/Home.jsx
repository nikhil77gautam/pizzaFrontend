import React from 'react';

const Home = () => {
  return (
    <section className="home h-auto md:flex md:w-full mt-5 mb-5 justify-between text-center  " id="home">
      <div className="home-text space-y-4 md:w-1/2 flex flex-col justify-center p- ">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-500">Pizza World</h1>
        <h2 className="text-xl md:text-3xl">Welcome To PizzaKhao</h2>
      </div>
      <div className="home-img md:w-1/2 pt-4">
        <img 
          className="w-full h-73 lg:mb-0 object-cover  lg:h-[28vw]" 
           src='https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU='
          alt="Pizza"  
        />
      </div>
    </section>
  );
}

export default Home;
