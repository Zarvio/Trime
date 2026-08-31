/* ============================================================
   QUESTIONS DATA FILE
   ------------------------------------------------------------
   YAHA SIRF QUESTIONS/CHAPTERS ADD YA EDIT KARNE HAIN.
   Har question EK LINE me likha hai, taaki file chhoti rahe
   aur naya question add/remove karna easy ho. Koi logic
   (checking, colors, next button) yaha NAHI hai — wo sab
   script.js me hai.

   NAYA QUESTION ADD KARNE KA TARIKA (ek line me):
   {en:"Question in English", hi:"प्रश्न हिंदी में", options:["A","B","C","D"], answer:0},
   // answer = sahi option ka INDEX (0 = pehla, 1 = dusra, ...)

   NAYA CHAPTER ADD KARNE KA TARIKA (Vistas ke andar):
   chapter2: { name:"Chapter naam", pdf:"pdfs/vistas-chapter2.pdf", questions:[ ... ] }
   ============================================================ */

window.QUIZ_DATA = {
  english: {
    name: "English",
    books: {
      vistas: {
        name: "Vistas",
        chapters: {
          chapter1: {
            name: "The Third Level",
            pdf: "pdfs/vistas-chapter1.pdf",
            questions: [
{en:"Who is the narrator of \"The Third Level\"?", hi:"\"The Third Level\" का narrator कौन है?", options:["Sam","Charley","Louisa","Tom"], answer:1},
{en:"Who was Charley's wife?", hi:"Charley की पत्नी कौन थी?", options:["Julia","Louisa","Helen","Susan"], answer:1},
{en:"Who was Sam?", hi:"Sam कौन था?", options:["Charley's friend","Charley's grandfather","Charley's psychiatrist and friend","Charley's brother"], answer:2},
{en:"Where did Charley discover the third level?", hi:"Charley को तीसरा level कहाँ मिला?", options:["Grand Central Station","Penn Station","Times Square","Central Park"], answer:0},
{en:"How many levels did Grand Central Station officially have?", hi:"Grand Central Station में officially कितने levels थे?", options:["One","Two","Three","Four"], answer:1},
{en:"What did Charley discover at Grand Central Station?", hi:"Charley ने Grand Central Station पर क्या खोजा?", options:["A secret room","A third level","A railway office","A museum"], answer:1},
{en:"Why did Charley want to go to Galesburg?", hi:"Charley Galesburg क्यों जाना चाहता था?", options:["To meet Sam","To visit his relatives","To escape from modern life and find peace","To get a job"], answer:2},
{en:"In which year did Charley want to go to Galesburg?", hi:"Charley किस वर्ष Galesburg जाना चाहता था?", options:["1890","1898","1895","1900"], answer:1},
{en:"What was special about Galesburg in 1898?", hi:"1898 में Galesburg की क्या विशेषता थी?", options:["It was a crowded city","It was a peaceful town","It was a business centre","It was a military centre"], answer:1},
{en:"What did Charley want to buy at the third level?", hi:"Charley third level पर क्या खरीदना चाहता था?", options:["A ticket to Chicago","A ticket to Galesburg","A ticket to New York","A ticket to Washington"], answer:1},
{en:"How much did Charley need for two tickets to Galesburg?", hi:"Galesburg के दो tickets के लिए Charley को कितने पैसे चाहिए थे?", options:["$1.90","$2.00","$1.80","$2.50"], answer:0},
{en:"What kind of currency did Charley have?", hi:"Charley के पास किस प्रकार की currency थी?", options:["Modern currency","Old-style currency","Foreign currency","Gold coins"], answer:0},
{en:"Why did the clerk refuse to sell Charley the tickets?", hi:"Clerk ने Charley को tickets देने से मना क्यों किया?", options:["Charley had no money","The train was cancelled","Charley offered modern currency","The station was closed"], answer:2},
{en:"What did Charley notice about the third level?", hi:"Charley ने third level के बारे में क्या देखा?", options:["Modern decorations","Old-fashioned surroundings","Empty platforms","Modern trains"], answer:1},
{en:"What kind of clothes were people wearing on the third level?", hi:"Third level पर लोग किस प्रकार के कपड़े पहने हुए थे?", options:["Modern clothes","Old-fashioned clothes","Uniforms","Sports clothes"], answer:1},
{en:"What kind of locomotives did Charley see?", hi:"Charley ने किस प्रकार के locomotives देखे?", options:["Electric locomotives","Steam locomotives","Diesel locomotives","Modern engines"], answer:1},
{en:"What did Charley think about the third level?", hi:"Charley ने third level के बारे में क्या सोचा?", options:["It was a dream","It was a part of the old Grand Central Station","It was a museum","It was a railway office"], answer:1},
{en:"Who did Charley tell about the third level?", hi:"Charley ने third level के बारे में किसे बताया?", options:["Louisa","Sam","His psychiatrist friend Sam","His grandfather"], answer:2},
{en:"What did Sam call Charley's experience?", hi:"Sam ने Charley के अनुभव को क्या कहा?", options:["A reality","A hallucination","A journey","A miracle"], answer:1},
{en:"What did Sam say was the reason behind Charley's hallucination?", hi:"Sam के अनुसार Charley के hallucination का कारण क्या था?", options:["Happiness","Stress and insecurity of modern life","Lack of money","Illness"], answer:1},
{en:"What does the third level symbolize?", hi:"Third level किसका प्रतीक है?", options:["Wealth","Escape from modern problems","Education","Technology"], answer:1},
{en:"What does Galesburg symbolize for Charley?", hi:"Charley के लिए Galesburg किसका प्रतीक है?", options:["War","Peace and security","Business","Adventure"], answer:1},
{en:"Why was Charley attracted to the year 1898?", hi:"Charley 1898 की ओर क्यों आकर्षित था?", options:["It was a modern year","It represented a peaceful and simpler life","It was his birth year","Sam lived there"], answer:1},
{en:"What was Charley's hobby?", hi:"Charley का hobby क्या था?", options:["Collecting stamps","Collecting old currency and stamps","Reading newspapers","Painting"], answer:1},
{en:"What did Charley find in his grandfather's stamp collection?", hi:"Charley को अपने grandfather के stamp collection में क्या मिला?", options:["A letter","An old stamp","A railway ticket","A newspaper"], answer:1},
{en:"What did Charley's wife Louisa think about the third level?", hi:"Charley की पत्नी Louisa third level के बारे में क्या सोचती थी?", options:["It was real","It was imaginary","It was dangerous","It was a railway platform"], answer:1},
{en:"Why did Louisa become worried about Charley?", hi:"Louisa Charley के लिए चिंतित क्यों हुई?", options:["He was losing money","He was spending too much time looking for the third level","He was ill","He wanted to leave her"], answer:1},
{en:"What did Charley's psychiatrist friend believe?", hi:"Charley के psychiatrist friend का क्या विश्वास था?", options:["The third level really existed","Charley was suffering from stress","Charley was travelling through time","Galesburg did not exist"], answer:1},
{en:"What does the story mainly deal with?", hi:"कहानी मुख्य रूप से किस विषय से संबंधित है?", options:["War","Escape from the harsh realities of modern life","Education","Friendship only"], answer:1},
{en:"What was Charley's occupation?", hi:"Charley का occupation क्या था?", options:["Teacher","Salesman","Doctor","Lawyer"], answer:1},
{en:"Where did Charley work?", hi:"Charley कहाँ काम करता था?", options:["Office","Insurance company","Railway station","Bank"], answer:1},
{en:"What did Charley's psychiatrist friend advise him?", hi:"Charley के psychiatrist friend ने उसे क्या सलाह दी?", options:["To travel to Galesburg","To stop looking for the third level","To leave his job","To collect stamps"], answer:1},
{en:"What did Charley and Louisa try to do?", hi:"Charley और Louisa ने क्या करने की कोशिश की?", options:["Find the third level","Find Sam","Find the old station","Go to Chicago"], answer:0},
{en:"What happened when Charley tried to find the third level again?", hi:"जब Charley ने दोबारा third level खोजने की कोशिश की तो क्या हुआ?", options:["He found it easily","He could not find it","He reached Galesburg","He met Sam"], answer:1},
{en:"What did Charley find one day?", hi:"एक दिन Charley को क्या मिला?", options:["A letter","A ticket","A diary","A newspaper"], answer:0},
{en:"Who had written the letter?", hi:"Letter किसने लिखा था?", options:["Louisa","Charley","Sam","A stranger"], answer:2},
{en:"Where was Sam's letter found?", hi:"Sam का letter कहाँ मिला?", options:["In Charley's office","In his grandfather's collection","In the third level","At the railway station"], answer:1},
{en:"Where was Sam when he wrote the letter?", hi:"Sam ने letter कहाँ से लिखा था?", options:["New York","Galesburg, Illinois","Chicago","Boston"], answer:1},
{en:"In which year did Sam say he was living?", hi:"Sam ने बताया कि वह किस वर्ष में रह रहा था?", options:["1898","1899","1900","1889"], answer:0},
{en:"What did Sam invite Charley to do?", hi:"Sam ने Charley को क्या करने के लिए invite किया?", options:["Visit New York","Join him in Galesburg","Meet him at the station","Visit Chicago"], answer:1},
{en:"What did Sam say about Galesburg?", hi:"Sam ने Galesburg के बारे में क्या कहा?", options:["It was noisy","It was peaceful and pleasant","It was dangerous","It was crowded"], answer:1},
{en:"What was Sam's profession?", hi:"Sam का profession क्या था?", options:["Teacher","Psychiatrist","Salesman","Doctor"], answer:1},
{en:"What did Sam finally do?", hi:"Sam ने अंत में क्या किया?", options:["Stayed in New York","Went to Galesburg in the past","Became a salesman","Returned to Charley"], answer:1},
{en:"What does the letter from Sam prove?", hi:"Sam का letter क्या साबित करता है?", options:["Charley was completely wrong","The third level may actually have existed","Galesburg did not exist","Sam was joking"], answer:1},
{en:"What was Sam's reaction to Charley's desire to escape?", hi:"Charley की escape करने की इच्छा पर Sam की क्या प्रतिक्रिया थी?", options:["He discouraged it","He understood it and eventually escaped himself","He laughed at him","He ignored him"], answer:1},
{en:"What does the third level represent psychologically?", hi:"Psychologically third level किसका representation है?", options:["Fear","Desire to escape from stress","Anger","Success"], answer:1},
{en:"What kind of life did Charley wish to live?", hi:"Charley किस प्रकार की life जीना चाहता था?", options:["Complicated modern life","Simple, peaceful and secure life","Rich business life","Political life"], answer:1},
{en:"Why did Charley not buy the tickets?", hi:"Charley tickets क्यों नहीं खरीद सका?", options:["He had insufficient money","He had modern currency which the clerk did not recognize","The train was full","He changed his mind"], answer:1},
{en:"What was the date on Charley's grandfather's stamp collection letter?", hi:"Charley के grandfather के stamp collection वाले letter से कौन-सा समय पता चलता है?", options:["1898","1940","1914","2000"], answer:0},
{en:"What was the main problem of modern life according to Sam?", hi:"Sam के अनुसार modern life की मुख्य problem क्या थी?", options:["Lack of technology","Stress, fear and insecurity","Lack of transport","Lack of money"], answer:1},
{en:"What is the significance of the title \"The Third Level\"?", hi:"\"The Third Level\" title का क्या significance है?", options:["It refers to a real third railway platform only","It represents an escape into a peaceful past","It refers to Charley's office","It refers to Sam's house"], answer:1},
{en:"Who is Louisa?", hi:"Louisa कौन है?", options:["Charley's sister","Charley's wife","Sam's wife","Charley's mother"], answer:1},
{en:"What did Charley's wife want him to do?", hi:"Charley की wife चाहती थी कि वह क्या करे?", options:["Stop searching for the third level","Leave his job","Go to Chicago","Sell his stamps"], answer:0},
{en:"What was the atmosphere of the third level?", hi:"Third level का atmosphere कैसा था?", options:["Modern and noisy","Old-fashioned and mysterious","Bright and modern","Dark and empty"], answer:1},
{en:"What did Charley see at the ticket window?", hi:"Charley ने ticket window पर क्या देखा?", options:["A modern clerk","An old-fashioned clerk","Sam","Louisa"], answer:1},
{en:"What kind of currency did the clerk expect?", hi:"Clerk किस प्रकार की currency चाहता था?", options:["Modern dollars","Old-style currency","Indian rupees","Gold bars"], answer:1},
{en:"Why did Charley run away from the third level?", hi:"Charley third level से भागकर क्यों आया?", options:["He was frightened by the old-fashioned people","He was arrested","He lost his ticket","He met Louisa"], answer:0},
{en:"What is the setting of the story?", hi:"कहानी का setting क्या है?", options:["Grand Central Station and Galesburg","London and Paris","Chicago and Boston","Washington and New York"], answer:0},
{en:"What kind of story is \"The Third Level\"?", hi:"\"The Third Level\" किस प्रकार की story है?", options:["Historical biography","Fantasy with psychological elements","Detective story","Comedy"], answer:1},
{en:"What is the central theme of the story?", hi:"कहानी का central theme क्या है?", options:["Love","Escapism from the stress of modern life","War","Wealth"], answer:1},
{en:"The Third Level was discovered by ______.", hi:"Third Level की खोज ______ ने की थी।", options:["Sam","Charley","Louisa","The clerk"], answer:1},
{en:"Charley wanted to escape to ______.", hi:"Charley ______ में escape करना चाहता था।", options:["Chicago","Galesburg","Boston","Washington"], answer:1},
{en:"Galesburg was in ______.", hi:"Galesburg ______ में स्थित था।", options:["New York","Illinois","California","Texas"], answer:1},
{en:"Charley wanted to go to Galesburg in ______.", hi:"Charley Galesburg ______ में जाना चाहता था।", options:["1898","1901","1888","1914"], answer:0},
{en:"Sam was a ______.", hi:"Sam एक ______ था।", options:["psychiatrist","salesman","clerk","teacher"], answer:0},
{en:"Charley was a ______.", hi:"Charley एक ______ था।", options:["doctor","salesman","psychiatrist","station master"], answer:1},
{en:"Charley's wife was named ______.", hi:"Charley की wife का नाम ______ था।", options:["Sam","Louisa","Helen","Mary"], answer:1},
{en:"The Third Level represents ______.", hi:"Third Level ______ को represent करता है।", options:["modern technology","escape from modern problems","poverty","war"], answer:1},
{en:"Sam finally disappeared into ______.", hi:"Sam अंत में ______ में चला गया।", options:["Chicago","Galesburg","New York","Boston"], answer:1},
{en:"The story suggests that people seek ______ when modern life becomes stressful.", hi:"Story बताती है कि modern life stressful होने पर लोग ______ तलाशते हैं।", options:["adventure","escape","money","fame"], answer:1},
{en:"Charley's hobby was collecting ______.", hi:"Charley का hobby ______ collect करना था।", options:["coins and books","stamps and currency","paintings and coins","newspapers"], answer:1},
{en:"The third level belonged to the ______.", hi:"Third Level ______ के समय का था।", options:["future","present","past","modern age"], answer:2},
{en:"Charley wanted to buy ______ tickets.", hi:"Charley ______ tickets खरीदना चाहता था।", options:["one","two","three","four"], answer:1},
{en:"Charley wanted to travel with ______.", hi:"Charley ______ के साथ travel करना चाहता था।", options:["Sam","Louisa","his grandfather","the clerk"], answer:1},
{en:"The story was written by ______.", hi:"यह कहानी ______ ने लिखी थी।", options:["Jack Finney","Pearl S. Buck","Louis Fischer","John Keats"], answer:0},
{en:"\"The Third Level\" is written by Jack ______.", hi:"\"The Third Level\" Jack ______ द्वारा लिखी गई है।", options:["Finney","London","Frost","Brown"], answer:0},
{en:"Charley found the third level at ______.", hi:"Charley ने third level ______ पर पाया।", options:["Grand Central Station","Galesburg Station","Penn Station","Chicago Station"], answer:0},
{en:"The third level was a place of ______.", hi:"Third level ______ की जगह थी।", options:["peace and escape","war and violence","business","education"], answer:0},
{en:"Sam's letter was a ______ to Charley.", hi:"Sam का letter Charley के लिए एक ______ था।", options:["warning","proof and invitation","complaint","threat"], answer:1},
{en:"The ending of \"The Third Level\" is ______.", hi:"\"The Third Level\" का ending ______ है।", options:["completely realistic","mysterious and open to interpretation","tragic","comic"], answer:1}
            ]
          }
        }
      },
      flamingo: {
        name: "Flamingo",
        chapters: {}
      }
    }
  },

   hindi: {
    name: "Hindi",
    books: {
      aaroh: {
        name: "आरोह भाग–2",
        chapters: {
          chapter11: {
            name: "बाज़ार दर्शन",
            pdf: "pdfs/hindi-aaroh-chapter11-bazar-darshan.pdf",
            questions: [
{en:"‘बाज़ार दर्शन’ पाठ के लेखक कौन हैं?", hi:"", options:["प्रेमचंद","रामचंद्र शुक्ल","जैनेन्द्र कुमार","हजारी प्रसाद द्विवेदी"], answer:2},
{en:"‘बाज़ार दर्शन’ किस प्रकार की रचना है?", hi:"", options:["कहानी","निबंध","कविता","नाटक"], answer:1},
{en:"‘बाज़ार दर्शन’ किस पुस्तक का पाठ है?", hi:"", options:["वितान भाग–2","आरोह भाग–2","अंतरा भाग–2","आरोह भाग–1"], answer:1},
{en:"बाज़ार का जादू किस इंद्रिय के रास्ते मनुष्य के मन में प्रवेश करता है?", hi:"", options:["कान","नाक","आँख","त्वचा"], answer:2},
{en:"लेखक के अनुसार बाज़ार किस प्रकार का जाल है?", hi:"", options:["प्रेम का जाल","शैतान का जाल","माया का जाल","ज्ञान का जाल"], answer:1},
{en:"बाज़ार में किस प्रकार का आकर्षण होता है?", hi:"", options:["मौन आकर्षण","मूक आमंत्रण","जोरदार प्रचार","धार्मिक आकर्षण"], answer:1},
{en:"बाज़ार का जादू किस व्यक्ति पर अधिक प्रभाव डालता है?", hi:"", options:["भरे मन वाले पर","खाली मन वाले पर","संत पर","गरीब पर"], answer:1},
{en:"बाज़ार का जादू चढ़ने पर व्यक्ति को क्या लगता है?", hi:"", options:["उसके पास सब कुछ है","उसे किसी वस्तु की आवश्यकता नहीं","उसे बहुत-सी चीज़ों की आवश्यकता है","बाज़ार बेकार है"], answer:2},
{en:"बाज़ार का जादू उतरने पर व्यक्ति को क्या अनुभव होता है?", hi:"", options:["वस्तुओं की वास्तविक आवश्यकता समझ आती है","और अधिक खरीदने की इच्छा होती है","वह धनवान बन जाता है","वह बाज़ार से डरने लगता है"], answer:0},
{en:"लेखक का मित्र बाज़ार से किसके साथ गया था?", hi:"", options:["लेखक के साथ","अपनी पत्नी के साथ","अपने बच्चों के साथ","अकेला"], answer:1},
{en:"लेखक का मित्र बाज़ार से क्या लेकर लौटा?", hi:"", options:["खाली हाथ","केवल एक वस्तु","कई बंडल","केवल फल"], answer:2},
{en:"मित्र ने अधिक सामान खरीदने का कारण किसे बताया?", hi:"", options:["लेखक को","दुकानदार को","अपनी पत्नी को","अपने मित्र को"], answer:2},
{en:"लेखक के मित्र की पत्नी ने क्या कहा था?", hi:"", options:["कुछ मत खरीदना","घर का जरूरी सामान लाना","बच्चों के लिए खिलौने लाना","कपड़े लाना"], answer:1},
{en:"लेखक के अनुसार पैसे की असली शक्ति क्या है?", hi:"", options:["बचत करना","दान देना","खरीदने की शक्ति","ब्याज कमाना"], answer:2},
{en:"बाज़ार किस भावना को उत्पन्न करता है?", hi:"", options:["संतोष","अभाव की भावना","त्याग की भावना","प्रेम की भावना"], answer:1},
{en:"बाज़ार का उद्देश्य व्यक्ति को किस ओर आकर्षित करना है?", hi:"", options:["ज्ञान की ओर","अनावश्यक वस्तुओं की ओर","धर्म की ओर","सेवा की ओर"], answer:1},
{en:"लेखक के अनुसार व्यक्ति को बाज़ार से बचने के लिए क्या चाहिए?", hi:"", options:["अधिक धन","खाली जेब","मन की दृढ़ता और संतोष","बहुत सारे मित्र"], answer:2},
{en:"लेखक के अनुसार बाज़ार की सार्थकता कब है?", hi:"", options:["जब व्यक्ति बहुत खरीदारी करे","जब जरूरत की वस्तुएँ खरीदी जाएँ","जब दुकानदार अधिक कमाए","जब व्यक्ति अपना पूरा पैसा खर्च करे"], answer:1},
{en:"‘पैसे की व्यंग्य-शक्ति’ से लेखक का क्या आशय है?", hi:"", options:["पैसा हँसाता है","पैसा व्यक्ति को अपनी शक्ति का अहसास कराता है","पैसा हमेशा नष्ट होता है","पैसा बेकार है"], answer:1},
{en:"चूरन बेचने वाले का नाम क्या था?", hi:"", options:["भगत जी","बाबू जी","लालाजी","सेठ जी"], answer:0},
{en:"भगत जी क्या बेचते थे?", hi:"", options:["कपड़े","चूरन","मिठाई","किताबें"], answer:1},
{en:"भगत जी की प्रतिदिन की कमाई कितनी थी?", hi:"", options:["एक रुपया","दो रुपये","छह आने","दस आने"], answer:2},
{en:"भगत जी कितने पैसे कमाने के बाद अपना सामान समेट लेते थे?", hi:"", options:["चार आने","छह आने","एक रुपया","दो रुपये"], answer:1},
{en:"भगत जी का जीवन किसका उदाहरण था?", hi:"", options:["लालच का","संतोष और आवश्यकता-आधारित जीवन का","विलासिता का","धन-संग्रह का"], answer:1},
{en:"भगत जी किस प्रकार के व्यक्ति थे?", hi:"", options:["लोभी","संतोषी","क्रोधी","विलासी"], answer:1},
{en:"भगत जी की सबसे बड़ी विशेषता क्या थी?", hi:"", options:["अधिक कमाई","कम में संतोष","अधिक सामान बेचना","महँगी वस्तुएँ खरीदना"], answer:1},
{en:"भगत जी बाज़ार में किस भावना के साथ आते थे?", hi:"", options:["अधिक धन कमाने की","आवश्यकता भर कमाने की","व्यापार बढ़ाने की","दूसरों से आगे निकलने की"], answer:1},
{en:"भगत जी बाज़ार के जादू से क्यों प्रभावित नहीं होते थे?", hi:"", options:["वे बाज़ार जाते ही नहीं थे","उन्हें अपनी आवश्यकताओं की सीमा का ज्ञान था","उनके पास बहुत पैसा था","वे दुकानदार थे"], answer:1},
{en:"लेखक ने भगत जी को किस प्रकार के जीवन का उदाहरण माना है?", hi:"", options:["उपभोक्तावादी जीवन","संतोषी जीवन","विलासी जीवन","आधुनिक जीवन"], answer:1},
{en:"बाज़ार में व्यक्ति की इच्छाएँ कैसी हो जाती हैं?", hi:"", options:["सीमित","समाप्त","बढ़ती जाती हैं","स्थिर"], answer:2},
{en:"बाज़ार मनुष्य को किस प्रकार प्रभावित करता है?", hi:"", options:["उसकी इच्छाएँ बढ़ाकर","उसकी इच्छाएँ समाप्त करके","उसे संतुष्ट करके","उसे आलसी बनाकर"], answer:0},
{en:"लेखक के अनुसार बाज़ार किसका प्रतीक बन जाता है?", hi:"", options:["त्याग का","उपभोग और आकर्षण का","शिक्षा का","सेवा का"], answer:1},
{en:"‘बाज़ार दर्शन’ का मुख्य विषय क्या है?", hi:"", options:["राजनीति","बाज़ारवाद और उपभोक्तावाद","शिक्षा","प्रकृति"], answer:1},
{en:"लेखक किस बात के प्रति सावधान करता है?", hi:"", options:["धन कमाने के प्रति","बाज़ार के आकर्षण के प्रति","पढ़ाई के प्रति","यात्रा के प्रति"], answer:1},
{en:"लेखक के अनुसार व्यक्ति को अपनी आवश्यकता का क्या करना चाहिए?", hi:"", options:["विस्तार","नियंत्रण","त्याग","प्रदर्शन"], answer:1},
{en:"‘खाली मन’ से क्या तात्पर्य है?", hi:"", options:["जिसमें धन नहीं है","जिसमें अपनी आवश्यकताओं और इच्छाओं की स्पष्ट समझ नहीं है","जो पढ़ा-लिखा नहीं है","जो अकेला है"], answer:1},
{en:"‘भरा मन’ किसका प्रतीक है?", hi:"", options:["संतोष और निश्चित आवश्यकताओं का","धन का","लालच का","अहंकार का"], answer:0},
{en:"बाज़ार में वस्तुओं की सजावट क्यों की जाती है?", hi:"", options:["वस्तुओं को सुरक्षित रखने के लिए","ग्राहकों को आकर्षित करने के लिए","दुकानदार को खुश करने के लिए","वस्तुओं को छिपाने के लिए"], answer:1},
{en:"बाज़ार का आकर्षण व्यक्ति के किस अंग पर सबसे पहले प्रभाव डालता है?", hi:"", options:["आँखों पर","कानों पर","पैरों पर","हाथों पर"], answer:0},
{en:"लेखक के अनुसार बाज़ार का जादू किस प्रकार का है?", hi:"", options:["स्थायी","अस्थायी","अदृश्य और निष्प्रभावी","धार्मिक"], answer:1},
{en:"बाज़ार का जादू उतरने पर व्यक्ति क्या समझता है?", hi:"", options:["उसने बहुत कम खरीदा","उसने अनावश्यक वस्तुएँ खरीद लीं","उसे और अधिक धन चाहिए","बाज़ार बहुत अच्छा है"], answer:1},
{en:"लेखक के अनुसार बाज़ार में जाने से पहले क्या निश्चित होना चाहिए?", hi:"", options:["कपड़े","आवश्यकताएँ","मित्र","दुकान"], answer:1},
{en:"बाज़ार से सही लाभ कौन उठा सकता है?", hi:"", options:["जो अपनी आवश्यकता जानता है","जो अधिक पैसा खर्च करता है","जो हर नई वस्तु खरीदता है","जो विज्ञापन देखता है"], answer:0},
{en:"लेखक के अनुसार बाज़ार किसे अपना गुलाम बना सकता है?", hi:"", options:["केवल गरीब को","केवल अमीर को","ऐसे व्यक्ति को जो अपनी इच्छाओं पर नियंत्रण नहीं रखता","केवल दुकानदार को"], answer:2},
{en:"भगत जी और लेखक के मित्र में मुख्य अंतर क्या था?", hi:"", options:["दोनों समान थे","मित्र बाज़ार से प्रभावित था, भगत जी संतोषी थे","भगत जी अधिक खर्च करते थे","मित्र दुकानदार था"], answer:1},
{en:"लेखक के मित्र ने बाज़ार से जरूरत से अधिक सामान क्यों खरीदा?", hi:"", options:["उसे सब वस्तुएँ पसंद थीं","बाज़ार के आकर्षण के कारण","पत्नी ने सब खरीदने को कहा था","उसे व्यापार करना था"], answer:1},
{en:"बाज़ार व्यक्ति की कौन-सी कमजोरी का लाभ उठाता है?", hi:"", options:["संतोष","अनियंत्रित इच्छा","परिश्रम","ईमानदारी"], answer:1},
{en:"लेखक का संदेश क्या है?", hi:"", options:["बाज़ार जाना छोड़ देना चाहिए","जरूरत और इच्छा में अंतर समझना चाहिए","अधिक धन कमाना चाहिए","हर वस्तु खरीदनी चाहिए"], answer:1},
{en:"‘बाज़ार दर्शन’ में लेखक किस प्रकार की मानसिकता की आलोचना करता है?", hi:"", options:["संतोषी मानसिकता","उपभोक्तावादी मानसिकता","धार्मिक मानसिकता","वैज्ञानिक मानसिकता"], answer:1},
{en:"लेखक के अनुसार सच्चा सुख किसमें है?", hi:"", options:["अधिक वस्तुएँ रखने में","आवश्यकता के अनुसार जीवन जीने में","धन खर्च करने में","बाज़ार घूमने में"], answer:1},
{en:"बाज़ार का आकर्षण किसे भ्रमित कर सकता है?", hi:"", options:["केवल दुकानदार को","केवल अमीर को","हर उस व्यक्ति को जो अपनी इच्छाओं को नियंत्रित नहीं करता","केवल गरीब को"], answer:2},
{en:"भगत जी का व्यवहार किस सिद्धांत पर आधारित था?", hi:"", options:["अधिक कमाओ, अधिक खर्च करो","आवश्यकता भर कमाओ और संतोष करो","धन जमा करो","बाज़ार से दूर रहो"], answer:1},
{en:"‘बाज़ार दर्शन’ में लेखक ने किस सामाजिक समस्या की ओर संकेत किया है?", hi:"", options:["बेरोजगारी","उपभोक्तावाद","अशिक्षा","प्रदूषण"], answer:1},
{en:"बाज़ार की चमक-दमक क्या पैदा करती है?", hi:"", options:["संतोष","नई इच्छाएँ","त्याग","ज्ञान"], answer:1},
{en:"बाज़ार में ग्राहक किस कारण आकर्षित होता है?", hi:"", options:["वस्तुओं की सजावट और प्रस्तुति से","केवल कीमत से","केवल दुकानदार से","केवल दुकान के आकार से"], answer:0},
{en:"लेखक के अनुसार मनुष्य को किस पर नियंत्रण रखना चाहिए?", hi:"", options:["आँखों पर","इच्छाओं पर","पैसों पर","दुकानदार पर"], answer:1},
{en:"बाज़ार का जादू उतरने के बाद व्यक्ति को किस बात का एहसास होता है?", hi:"", options:["उसने आवश्यक वस्तुएँ ही खरीदीं","खरीदारी में विवेक खो गया था","उसके पास कम पैसे हैं","बाज़ार बंद है"], answer:1},
{en:"‘बाज़ार दर्शन’ का मूल संदेश किससे संबंधित है?", hi:"", options:["संतोष और विवेक","धन और शक्ति","राजनीति और धर्म","शिक्षा और रोजगार"], answer:0},
{en:"लेखक के मित्र का उदाहरण किस बात को स्पष्ट करता है?", hi:"", options:["बाज़ार की उपयोगिता","बाज़ार के आकर्षण का प्रभाव","व्यापार की कठिनाई","गरीबी"], answer:1},
{en:"भगत जी का उदाहरण किस बात को स्पष्ट करता है?", hi:"", options:["अधिक कमाई","संतोष और संयम","बाज़ारवाद","उपभोक्तावाद"], answer:1},
{en:"लेखक के अनुसार बाज़ार का जादू किसे नहीं चढ़ता?", hi:"", options:["जिसे अपनी जरूरतों का ज्ञान है","अमीर व्यक्ति को","दुकानदार को","बच्चे को"], answer:0},
{en:"बाज़ार में जाने वाले व्यक्ति के लिए सबसे जरूरी क्या है?", hi:"", options:["बहुत पैसा","विवेक","बड़ा थैला","समय"], answer:1},
{en:"‘बाज़ार दर्शन’ में लेखक ने किसका विरोध किया है?", hi:"", options:["आवश्यकता का","अंधी खरीदारी का","उपयोगिता का","व्यापार का"], answer:1},
{en:"बाज़ार का जादू किस प्रकार की इच्छाओं को बढ़ाता है?", hi:"", options:["वास्तविक आवश्यकताओं को","अनावश्यक इच्छाओं को","आध्यात्मिक इच्छाओं को","सामाजिक सेवा की इच्छाओं को"], answer:1},
{en:"लेखक के अनुसार संतोष किससे बचाता है?", hi:"", options:["शिक्षा से","बाज़ार के जादू से","मेहनत से","व्यापार से"], answer:1},
{en:"भगत जी अपनी कमाई के साथ क्या करते थे?", hi:"", options:["उसे तुरंत खर्च कर देते थे","आवश्यकता के अनुसार रखते थे और संतुष्ट रहते थे","उसे व्यापार में लगाते थे","उसे दूसरों को देते थे"], answer:1},
{en:"बाज़ार का आकर्षण किस प्रकार का आकर्षण है?", hi:"", options:["विवेकपूर्ण","चकाचौंध पैदा करने वाला","आध्यात्मिक","प्राकृतिक"], answer:1},
{en:"लेखक ने बाज़ार को किस रूप में प्रस्तुत किया है?", hi:"", options:["केवल खरीदारी की जगह","मनुष्य की इच्छाओं को प्रभावित करने वाली शक्ति","शिक्षा की जगह","मनोरंजन की जगह"], answer:1},
{en:"‘बाज़ार दर्शन’ पाठ पाठक को क्या सीख देता है?", hi:"", options:["अधिक खर्च करना","विवेकपूर्ण उपभोग करना","बाज़ार से डरना","व्यापार करना"], answer:1},
{en:"बाज़ार में व्यक्ति को किस बात का ध्यान रखना चाहिए?", hi:"", options:["हर आकर्षक वस्तु खरीदने का","आवश्यकता और सामर्थ्य का","दूसरों की नकल करने का","दुकानदार की बात मानने का"], answer:1}
            ]
          }
        }
      }
    }
  },
  math: { name: "Math", books: {} },
  physics: { name: "Physics", books: {} },
  chemistry: { name: "Chemistry", books: {} }
};