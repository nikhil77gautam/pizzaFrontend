import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    
    
    <div className=" h-[50%] overflow-hidden lg:mt-9 flex justify-center  bg-white ">
       
        <div className="w-[] pt-[.3%] pb- md:pt-1    ">
      <Carousel className=" " showThumbs={false} showArrows={false}  autoPlay infiniteLoop>
        {/* <div className="   ">
          <img className="h-[50vw]    " src="https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D" />
        </div> */}
        <div className="h-[] ">
            <img  className="h-[50vw]  md:h-[40vw] " src="https://media.istockphoto.com/id/835271096/photo/slice-of-pizza-cheese-crust-seafood-topping-sauce-with-bell-pepper-vegetables-delicious-tasty.webp?b=1&s=170667a&w=0&k=20&c=uweNCcZRaUjByzbqk7P9VwU9iN5Wy16KDJrnDP3uKX8=" alt="" />
        </div>
        <div className="  ">

          <img
           className="h-[50vw]  md:h-[40vw]  border "
            src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fHw%3D"
            alt=""
          />
        </div>
        <div className=" ">
          <img
           className="h-[50vw]  md:h-[40vw] "
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D"            alt=""
          />
        </div>
       
      </Carousel>
      </div>
    </div>
   
  );
};

export default Slider;
