# PB&J Time Sandwitch Builder React App

### Link to deployed app: https://pbj-time.vercel.app/

### Objective
The objective of this project was to gain experience building web apps in React from scratch. I created a sandwitch builder app that lets you add ingrediants and make your own sandwitch. The app comes with sort and filter features to filter though items (nut butters, jams, toppings). 

### Running the App Locally
1. Download the repository and open it in VSCode. 
2. In the terminal, use the command "npm start" to launch the webapp. 
3. Navigate to http://localhost:3000 to view the site. 

### Design Choices
Instead of creating a Figma for this app, I instead based the design off a pre-existing website I created. 

Link to website: https://blueno-bakery.vercel.app/

I decided that users can only add one nut butter, one jam, and up to two toppings. This prevents the cart container from getting too long and the sandwitch picture animation from having too many layers. 

Quantity is shown for the toppings only, because you can only have one nut butter and jam. If you try adding another nut butter or jam to cart, the existing item gets replaced. If you add more than two toppings, the webpage alerts you. This allowed me to experiment with different error handling methods. 

### Lessons Learned
**Animation:** This was my first time using React animation for a website. The movement was easy, but the placement was hard to get the pictures to layer on top of each other perfectly (especially for responsive screens).

**Stackable Sort and Filter:** I had to play around with the code to make sure that the sort and filters were stackable. Also, I wanted the existing sort/filter to be preserved when the other was changed. 

**Prodia AI + Photoshop:** All the images were created using Prodia AI, which is an image generator. The AI doesn'can't properly generate words (still a novel technology), so I had to go in with photoshop to fix the gibberish and other erroneous  features. 

**Responsive Design:** I made this web app responsive to desktop, tablet, and phone screens. All along the process, I tested the responsiveness using the Chrome developer tool and my own personal devices. 


### Bugs/Errors
As of now, there are no known bugs in the code, and I tried to fix them all the best I could. If there are any ways to improve the usability or UX of the site, let me know!

### Future Iterations
I would like to test my code with integration and unit tests. If given more time for this project, that would be my immediate next step. 