# MobileGamingLab

Technical Documentation
Inhaltsverzeichnis
1 Installation manual	2
1.1 Server	2
1.2 Mobile terminal	3
2 General description	5
3 Technical description of functionalities and structures	6
3.1 Database	6
3.2 Community-Surface	12
3.3 Interfaces (RestAPI / Websockets)	12
3.4 Game structure	13
4 Handling	17
4.1 Set up a new game	17
4.2 Playing the game on the mobile terminal	19
5 Possible extending functionalities	22
5.1 Editor	22
5.2 Community	22
5.3 Game	22










1 Installation manual
1.1 Server
Software:
•	Nodejs (https://nodejs.org/download/) with the package manager NPM
•	MongoDB (https://www.mongodb.org/downloads)

The aforementioned software need to be installed at the server. Note that MongoDB requires a 64Bit Operating Systems to run.

Depending on your operating system, please follow the install instructions provided at the linked web sites. In the following the commands used to set up a server on a Ubuntu Server are documented.

To install the software type in the following commands:
sudo apt-get install nodejs npm mongodb

The next step would be to download the project from GitHub and unzip the package to your desired destination.
wget https://github.com/MobileGamingLabMobile/MobileGamingLabBackend/archive/master.zip

After the package was unzipped, you need to change to the directory at which the project is located and install the required NodeJS libraries. This can simply be done by running the command in the folder where the app.js is located:
npm install
Database Configuration
Now the project is installed and it is required to configure MongoDB. Therefore you need to create a database and an admin for this database. To achieve this we recommend to follow the instructions found at the following website.

http://www.hacksparrow.com/mongodb-add-users-and-authenticate.html

In order to establish the database connection from the project, we need to edit the projects database configuration file. The file can be found under “./config/database.js” from the root directory of the project. This file contains basically a JSON file with one parameter, namely “url”. As value we need to state the MongoDB connection string. As a schema the string looks like the following:
“mongodb://<user>:<password>@<host>:<port>/<database>”, e.g. “mongodb://peter:peters_password@localhost:27017/mugl”

Start Up
Way #1:
The simplest way to start the server is by using the terminal and change the directory to the project path and type in  „node start“. The drawback of this is that after a server restart the websites are not reloaded.

Way #2:
In order to eliminate the drawback of the first approach, it is recommended to install another nodejs library “pm2”.
sudo npm install -g pm2

To run the project check if you are still in the project directory elsewise change to it and run the command „sudo pm2 start app.js“.
To check the status of the process use „sudo pm2 list“, which will list all the started nodejs applications by pm2. For additional information on pm2 access the help file of pm2 by using the parameter „—help“.

Additional Information
Sometimes there are problems with some libraries due to the renamed nodejs interpreter (former “node”, now “nodejs”). If you run into problems you should create a symlink in Ubuntu:
ln -s /usr/bin/nodejs /usr/bin/node

1.2 Mobile terminal
1.2.1 User
To install the application on the mobile device ( currently only Android is supported) the User has to follow these steps.
1.	Download the Android application package (apk) from http://giv-mgl.uni-muenster.de:8080/apk/android-debug.apk 
2.	Transfer the file to the users mobile device (to the SD card or the internal storage).
3.	On the mobile device go to the Settings. Under ‘Security’ check ‘Unknown Sources’ to allow the installation from Sources other than the Play Store. (The Settings are structured differently in different Android versions. If it can’t be found the Support Team of your Android Version has to be confronted.)
4.	On the mobile device go to the path where the downloaded apk has been put and tap the file.
5.	This opens a menu where the permissions the application uses are listed. If the User can accept these permissions ‘Install’ has to be clicked
6.	The Installation is finished and the user can start the application.

1.2.2 Developer
A Developer has to install several things to modify the application and build a new one.
Needed are a Android SDK, Nodejs, a git client, Cordova and a software development platform like Netbeans.
For testing the Developer has to allow USB Debugging under ‘Settings’-> ‘Developer Options’
Android SDK
To install the Android SDK please refer to https://developer.android.com/sdk/index.html regarding which opearting system is used. Only the Android SDK is needed, the Android Studio is not used.

Nodejs
To install Nodejs please follow the instructions regarding your operating system. https://nodejs.org/

Git Client
If the developer got our code he or she probably already has a git client installed. If not the developer needs to install one like e.g. http://git-scm.com/. (git is only used in the background)

Cordova
If Nodejs is installed Cordva can easily be installed with this command: 
npm install -g cordova

Netbeans
Download and install Netbeans https://netbeans.org/downloads/index.html.
If all is set up, the developer needs to import our project from GitHub into his or her Netbeans projects.
(If he or she can not import our project he or she has to create a new HTML 5 Cordova project and change the www folder to the one from our repository)


Testing and Building
After modifying the application in Netbeans the source can be be built. To test the application on a mobile device the developer can select if  he or she wants to run the application on a emulated or a mobile device and run the project.
 
If he or she doesn’t use Netbeans but an ordinary editor you can build and test the application with this commands:
To only build project
/path/to/project/ cordova build android

To run application an emulated mobile device
/path/to/project/ cordova emulate android

To run application on real mobile device (needs to be connected via USB and USB Debugging enabled)
/path/to/project/ cordova run android

2 General description
The product is an application to build up small GPS based games and publish them to the community. Everyone in the community can subscribe the game and afterwards is able to play the game on his/her mobile terminal. The Application is based on web technologies and is divided in two parts. The first part contains the server side which is hosting the building-complex you can access via internet browser of your choice (Mozilla Firefox, Internet Explorer,...) and also the game-engine doing all the calculations. Secondly there is the mobile terminal containing the access to the community and actually running the game.

The intention is that with the application games of the genre role-playing game (RPG) and adventure game can be created as well as paper chases and games like “zombie run”. The application is constructed in this way that new elements of an existing abstract game element can be implemented easily by a developer. So it is possible that complex games can be created. Moreover community aspects are considered. The platform offers that the created games can be played by other players, not only the creator of the game. Also users can communicate with other users above the platform. The data model of the game engine is furthermore structured that way that multiple players can play against each other or together.

3 Technical description of functionalities and structures
3.1 Database
The database is MongoDB (https://www.mongodb.org/) saving all the information and models needed for the application. The JSON format is used while saving the data. Below the database schemes and consider the name.id is automatically generated.
user.profile
name	profession	country	city	avatar
string	string	string	string	
user.login
email	password	registration	session_key	last
string	string	date	string	date
user.games
owned	subscribed			
[game.id]	[game.id]			

gameSession
started	owner	players	groups	game
date	user.id	[playerInstance.id]	[group.id]	game.id

playerInstance
user	availableQuests	finishedQuests	activeQuest
user.id	[quest.id]	[quest.id]	quest.id

comment
user	game	rating	time	text
user.id	game.id	integer	date	string

game.metadata
name	description	category	owner	published	publishedDate	comments	rating	
string	string	[string]	user.id	boolean	date	[comment.id]	double	
game.components
quest	questCollections	scenes	plots	boundary	roles	objects	items	resources
[quest.id]	[questCollection.id]	[scene.id]	[plot.id]	double, double, double,double	[string]	[object.id]	[item.id]	[resource.id]

quest
requirements	description	tasks	questEvent	started	finished	title	available
[trigger.id]	content.id	[interaction.id]	questEvent.id	boolean	boolean	string	boolean

questCollection
quests	plot
[quest.id]	[quest.id]

scene
questCollection	trigger	questEvent
[questCollection.id]	[trigger.id]	questEvent.id

questEvent
sequence	title	actions
[content.id]	string	[action.id]

interaction
trigger	actions
[trigger.id]	[action.id]

content
name	url	type
string	string	“image” | “video” | “sound” | “text”

trigger
conditions	triggered
[condition.id]	boolean

condition
name	available	type				
string	boolean	string				
condition.timeCondition
countdown	beforeTime	betweenTime	afterTime			
double	date	[date, date]	date			
condition.progressCondition
started	finished	quest				
boolean	boolean	quest.id				
condition.locationCondition
coord	minSpeed	minDistance	item	player	buffer	
[double, double]	double	double	item.id	player.id	double	
condition.objectCondition
collected	activated	used	spent	amount	object	player
boolean	boolean	boolean	boolean	integer	object.id	player.id
condition.groupCondition
formed	numberOfPlayers	groupID				
boolean	integer	group.id				
condition.inputCondition
value	validated	performed				
string	boolean	boolean				
condition.playerCondition
playerID	groupID	roleID	playsRole	roleAssigned	visible	
player.id	group.id	string	boolean	boolean	boolean	
condition.triggerCondition
trigger	relation					
[trigger.id]	string					


action
type	game						
string	game.id						
action.timeAction
wait	countdown	startTime	stopTime				
boolean	integer	boolean	boolean				
action.progressAction
start	unlock	finish	update	interaction	game		
boolean	boolean	boolean	boolean	interaction.id	game.id		
action.objectAction
add	resource	decreaseResource	item	addItem	player	removeItem	placeItemOnMap
integer	resource.id	integer	item.id	boolean	player.id	boolean	boolean
action.groupAction
group	showPlayers	setVisibility					
group.id	[player.id]	boolean					

object
item	resource	player	properties
item.id	resource.id	player.id	properties.id



properties
name	type	value
string	string	string

item
name	position	icon	actions	buffer
string	GEOJSON	string	[action.id]	double

resource
value	name	description
integer	string	string

player
position	buffer	resource	groups	properties	roleName	user
[double, double]	double	[resource.id]	[group.id]	properties.id	string	user.id
player.inventar
enabled	slot					
boolean	[item.id]					

group
member	properties
[player.id]	properties.id
group.inventar
enabled	capacity
boolean	[item.id]

3.2 Community-Surface
The community website is a one-pager realized with Angular.js (https://angularjs.org/). There are several templates: sign-up, log-in, profile, changeProfile, gameinfo, selectGame, help and game. The Framework Foundation5 (http://foundation.zurb.com/) is used to create a simple layout and a webpage easy to use. All games are listed in tables which are built with the plug-in datatables (datatables.net). This gives the advantage that it provides sort, search and paging functions. Furthermore the plug-in rateYo (http://prrashi.github.io/rateYo/) is used to enable the rating of the games. During the game a map is displayed and for this reason leaflet (http://leafletjs.com/) is integrated.

3.3 Interfaces (RestAPI / Websockets)
The communication between server and client is implemented using the REST communication pattern and websockets. The exchange objects are JSON object, since it is the easiest object to parse in a JavaScript environment. The API’s are split into four main areas:
1.	UserAPI
2.	CommunityAPI
3.	EditorAPI
4.	WebsocketAPI
Each of those API’s has a clear directive. The UserAPI deals mainly with user management functionalities, e.g. login / logout, signup and user profiles. The community API offers functions for commenting, exploring published games and playing the game. The editor API offers functions to create and edit various game components such as the quest, the tasks, as well as the trigger and actions. Last, the websocket API offers functions for the mobile client to interact with the game engine.

Links to API
Community: https://docs.google.com/document/d/1-Yol0kgTkvUVP2B21T55YoZkbPUQbcTJn0dzyhsfLpk/edit?usp=sharing

Editor: https://docs.google.com/document/d/1YWBVQjkkxAg9c1A4ClIiSD7nN5CSwE9xdkhqXf1tEsg/edit?usp=sharing

User: https://docs.google.com/document/d/10RILLsxNux5ZCKCzirXSmhluO6M41nNneieN32Gz2EM/edit?usp=sharing

Websocket: https://docs.google.com/document/d/1UUvv7aIOc_VDUXFN0ffP-O0C5TDvJA0IP1h-WeuRcJA/edit?usp=sharing

3.4 Game structure
The basis of each created game are quests which have to be solved to win the game. One quest at a time can be picked from a quest log which is then activated and can be solved. When a quest is finished also new quests can appear in the quest log. This makes it possible to build up a story line within a game.  

A central role in the games plays a map. On this map little icons can be placed which mark specific locations where specific game actions are triggered. The idea was also that the own position and the positions of the other players are shown on the map. These positions are updated frequently so there will be moving icons on the map. Next to the real positions of the players also the motion of objects in the game world should be shown. 
                
Another element of the game are items. All objects which are placed on the map are of this category. The player can store items in his inventar. These items can be activated by the player to execute a certain action. Simple values which need to be stored for the player, but can not start an interaction within the game, are also considered within the data model.

The picture shows an activity diagram which describes the core line of action of the games which could be build. The diagram does not mention: multiplayer aspects, other conditions beside the client values (like time,...), other events which could happen (Text, pictures, videos,... appear or resource values are changed and items are added lost). 
The box in grey marks that this is a nice feature, but it is not considered in the database, yet.
Multiplayer aspects
With the database schema it is possible that multiple players can play together or against each other. So they can try to solve the same quest or catch the other player (like mister x). With the schema it is also possible that the players can see each other on the map. An idea is also to create a chat possibility that the player can communicate easily with each other.
Game state management
After the user has chosen to play a game a game session will be created, which will store general information about the started game. Those information are the host of the game and all the involved players of this particular game instance with their current game progress. It also has an unique id in order to manage the communication between clients and server in a way that the correct instance is called when the game engine evaluates the input given by a client.

While the “player” object created by the editor mainly describes the general properties and appearance of the player, the player instance uses the player object as a blueprint to create instances for each individual user that is involved in the game session. The most important parts of those instances are the links to the available and finished quest that are part of the game and the instantiation of the players inventar as well as assigned ressources like a score or currencies and alike.
Game engine
The actions of the player (moving in the real world, activate items,...) need to be evaluated to check if the active quest is solved. This is done by the game engine which is located at the server. As that are multiplayer games the values of different players can influence the evaluation. For example it should be possible to compute the distance between the players using their GPS positions.
The architecture of the game engine is designed as a flow.
The architecture of the game engine is designed as a flow. The core process of the engine is shown on the left part of the picture. At the beginning there are the values which were send from the smartphone application of the player. These are tested if they fulfill one or more of the defined conditions. If a condition is fulfilled then all existing triggers are checked if they link to the fulfilled condition. The triggers which are found are then checked if all of their conditions are fulfilled. The same will be done with the interactions. All interactions where all their triggers triggered will then execute one or more actions.
The right part of the picture shows the connection of the game engine to other game elements. The status of the Conditions, Trigger and Interactions are stored in the “Session” object, which is part of the Progress Controller. The Progress Controller links to the “PlayerInstance” object, which stores the active quest. If all Triggers were triggered that are needed to finish that quest, the Progress Controller executes the related actions and sequences.

                
Conditions store values, which are compared against the incoming values. If the test succeed then the condition is fulfilled. For example a condition should be fulfilled when the player is near to a specific location. Then the GPS coordinates are compared with the coordinates of this location.

The trigger are a aggregation of multiple conditions. They describe a state in which all conditions need to be fulfilled. An example is that the player needs to be at a specific location (Condition 1) at a specific time (Condition 2).

For a better usability in the game editor there exist the “interaction” objects which aggregate multiple triggers. So states can be defined as a trigger and they can be used multiple times in different interactions. A specific state then only needs to be created one time.

If all trigger of an interaction have triggered (are fulfilled), then all actions, which are defined in that interaction, will be executed.

4 Handling
4.1 Set up a new game
Since a GUI for the editor was not realized, creating a new game needs to utilize the REST interface for the editor directly. The API offers multiple function to create new objects, edit or delete them. In principle all the data structures previously stated are reflected here.
The general workflow on setting up any of the objects is that first a new and empty object is created, which is sent back to the user. The most important part of those objects is their ID, because for all manipulations done with the object it is required to state the ID.
Out of convenience the following overview about the creation of objects will not list the access token, which is required to authenticate the editor in the system and to verify their rights to edit. However this token is REQUIRED and cannot be left out. The token can be obtained after a simple login, where it is sent as part of the response object.
The token needs to be sent either as part of the body or the query on the parameter “acces_token” or it can be passed as part of the header of the request document at the parameter “x-access-token”.
Intentionally the main purpose of the editor was to provide an easy way to create games, mainly by visualizing the components, handling the server requests and setting the links between the components. In the current state the editors need to execute their requests manually and they need to note down the component ID by themselves.
To achieve this one can use a RESTClient browser plugin. We used for debugging the plugin RESTClient (http://restclient.net/).








Create new game
 
 
 
 
Those requests are just some examples how you can create objects with the editor API. To get an overview about the full functionalities of the editor, please look up the API description.

4.2 Playing the game on the mobile terminal
The first step is to install the application via an .apk file which can be found on the server. After starting the MGL-app the user is asked to sign in with an existing account or to register.









To personalize an account the user may add information about himself, such as name, profession, country or city. Those will be displayed on the personal profile page.









All games are shown on the gameselect page. These can be filtered to display only those the user has created or is subscribed to (those functions are also provided on the profile page). Furthermore a search bar and a rating system help the user finding games to fit his interests. 













When selecting a game further information is displayed and the game can be started via a button. Additionally comments from other players and a link to the author are provided. 










After starting a game the user is asked to select a role. Finally the actual game page is displayed. It contains a centered map with markers, several buttons for tasks, items, options and help and labels, e.g. with the current task or if a new task has been added. Furthermore the user can choose between the available tasks. 









5 Possible extending functionalities
5.1 Editor
5.1.1 Collaborative game building
Building games with other community members to make the games bigger and more complexes than one single person can do. With more complex games or even games with a large story telling can satisfy more players than simpler games. Therefore it is necessary to adjust the database schema that there is not only one game owner.

5.1.2 Visual surface – editor
Caused by the fact that there is no editor GUI this is the most important extension to this product. The editor should be well structured and easy to use. Moreover should be more a construction kit then a code editor so that everyone can use it to generate proper games.

5.2 Community
5.2.1 Design optimization
The design is consistent. In case the users has suggestions to optimize the design they have the possibility to contact us. After checking the request we are able to optimize it in their perception.

5.2.2 Multi-language
Because of the growing community there is the necessity to make them all feel comfortable including their decision to change the language of the surface. Changing language is not only appreciable for the community pages but also in-game and the editor have this requirement.

5.2.3 Introduce a chat-functionality
Especially for games with a multiplayer a chat is important to arrange games with other people in the area. Also the chat can be used to solve problems or get hints for some difficult tasks.

5.3 Game
5.3.1 Team games and chat-functionality
Supporting the community aspect there could be more than one player involved in the game (player versus player / players versus players) that you can have a contest with other players or with groups of other players. For internal communication there could be a chat-functionality to organize your team or contact other players like it is explained above.

5.3.2 More condition-handling and action-methods
Till now the game can evaluate if the player is at the right location. Moreover it can change the status of a quest to “solved”. For the other conditions and actions there are needed code lines to add the evaluation of the conditions and the execution of the actions. The actions also need to send the updates to the client application. Additionally visualisation of the updates have to be implemented.

5.3.3 Gameplay optimization
As on-going process there is the gameplay optimization which is changing a lot across the types of games that can be build. It would be a good thing to reorder the sequence of surface buttons to get comfortable while playing the game.

