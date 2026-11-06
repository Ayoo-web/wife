// ============================================================
//  EVERYTHING PERSONAL LIVES IN THIS ONE FILE.
//  Edit the words, photos and captions here — no other file
//  needs to change. To add a photo: drop the file into the
//  matching folder in public/images/... and add an entry below.
// ============================================================

export default {
  her: {
    name: 'Nikki',
    nicknames: ['Kykyng', 'Palangga', 'Love'],
  },
  me: 'Hamid',

  cover: {
    title: 'THE ONE GAME I NEVER WON',
    // "Made for you, <name>" uses her.name below
    invitation: 'Open this, love.',
  },

  chess: {
    chapterLabel: 'Chapter One',
    title: 'The Losing Streak',
    intro: 'Somewhere between high school and college, before you were my favorite person, we kept ending up across a chessboard from each other.',
    invitation: "It's your move, love. Take my queen.",
    afterMoveHead: 'Still undefeated, aren’t you, Nikki?',
    afterMove: [
      "I've beaten everyone else, but somehow, I've never beaten you. Not once, in all our games.",
      "I used to beat practically everyone in our class — even the strongest player among us. You could never beat him. But you beat me, every single time we sat down to play. And somewhere along the way, I honestly stopped minding.",
    ],
    playAgain: 'take my queen again',
  },

  messages: {
    chapterLabel: 'Chapter Two',
    title: 'Before We Knew',
    intro: 'The summer before college, before there was an us, you kept replying to my Messenger notes. Two people, casually talking, with no idea where it would lead.',
    outro: 'Funny how something as simple as replying to a note could eventually lead us here.',
    // Each item becomes a framed screenshot. Add real files to
    // public/images/early-conversations/ and set src to the filename.
    // (Ordered by Messenger’s filename sequence.)
    screenshots: [
      { src: '/images/early-conversations/photo_6298612008680625421_y.jpg', annotation: 'a reply that started everything' },
      { src: '/images/early-conversations/photo_6298612008680625422_y.jpg', annotation: 'the summer before everything' },
      { src: '/images/early-conversations/photo_6298612008680625424_y.jpg', annotation: 'just talking. nothing more, we thought.' },
      { src: '/images/early-conversations/photo_6298612008680625427_y.jpg', annotation: 'two people getting less strange' },
      { src: '/images/early-conversations/photo_6298612008680625428_y.jpg', annotation: 'more of that summer' },
      { src: '/images/early-conversations/photo_6298612008680625429_y.jpg', annotation: 'the conversation that didn’t stop' },
      { src: '/images/early-conversations/photo_6298612008680625431_y.jpg', annotation: 'somewhere in between all of this' },
      { src: '/images/early-conversations/photo_6298612008680625433_y.jpg', annotation: 'still just replying to your notes' },
      { src: '/images/early-conversations/photo_6298612008680625434_y.jpg', annotation: 'and somewhere in those replies, we stopped being strangers' },
    ],
    placeholderText: 'A memory from that summer will live here, once a real screenshot is added.',
  },

  mcdonalds: {
    chapterLabel: 'Chapter Three',
    title: '9:00 PM — A Seat Beside Me',
    invitation: '(tap a chair)',
    reveal: 'Of course! Ali ali tapad ta.',
    story: [
      'It was Palakasan season. The whole campus was loud with volleyball and basketball, and by 9 PM we were both hungry. So I asked you to eat at McDonald’s with me.',
      'You hesitated — shy, insisting you didn’t want me to pay for your food. It took quite a bit of convincing before you finally said yes.',
      'We ordered. The food arrived. I went to the counter to collect it, and when I came back, you asked if you could sit beside me. Not across. Beside.',
      '"Of course! Ali ali tapad ta."',
      'We ate, and we talked. Afterward I walked you to the sikad station, and we kept talking a little longer before you went home. But the night wasn’t over — we kept the conversation going until around 1 AM, before either of us slept.',
      'Nothing extraordinary happened that night. No grand gesture, no dramatic confession. Just dinner, conversation, and two people who didn’t want to stop spending time together. That’s exactly why it matters.',
    ],
  },

  littleThings: {
    chapterLabel: 'Chapter Four',
    title: 'Things You Do Without Knowing I Notice',
    intro: 'A collection of small things. Tap each one — I’ve been keeping notes.',
    // front = the little thing, back = what I want her to know.
    cards: [
      { front: 'that hehehe', icon: '♪', back: 'That little hehehe of yours. I don’t think you understand how much I love hearing it. It’s one of my favorite sounds in the world.' },
      { front: 'your smile', icon: '☺', back: 'Even when you’re not trying — even when it’s weird in the most endearing way — it somehow becomes the best part of my day.' },
      { front: 'the hand thing', icon: '✾', back: 'When we walk, your hand seems to find mine all on its own. Without thinking. Every time. I notice. I love it.' },
      { front: 'seat beside me', icon: '□', back: 'You always want to sit beside me when we’re eating. Somehow, you became my favorite person to sit beside.' },
      { front: 'ube, always', icon: '☘', back: 'If it’s ube-flavored, it’s yours. I never forget what you love — and I keep it in mind more often than you probably realize.' },
      { front: 'shawarma runs', icon: '☭', back: 'Nothing complicated, just shawarma with you. Some of my favorite nights are the simplest ones.' },
      { front: 'the stars', icon: '✦', back: 'You love astronomy. So do I. One shared sky, looked at from the same side, together.' },
      { front: 'billiards', icon: '◎', back: 'You, leaning over the table, taking your shot. Add billiards to the list of things you’re surprisingly good at — and that I love watching.' },
      { front: 'arm massages', icon: '❖', back: 'You massage my arms out of nowhere. And sometimes bite them, I think, without even noticing. Both are yours — the arms too.' },
      { front: 'that jealousy', icon: '♦', back: 'Your jealousy is out of this world. Honestly? I find it endearing. It tells me you care in the loudest possible way.' },
      { front: 'brush your teeth', icon: '✾', back: 'You scold me when I do dumb things — even before I get hurt. You remind me what I always forget, take care of me, and want me clean and healthy. I pretend to complain. I don’t, really.' },
      { front: 'sleepy hugs', icon: '♡', back: 'You sleep with my arms wrapped around you — even quick naps. Being your favorite place to rest is quietly my favorite thing to be.' },
    ],
  },

  gallery: {
    chapterLabel: 'Chapter Five',
    title: 'Little Places, Big Memories',
    intro: 'Tap any photo to look closer.',
    placeholderText: 'Your real photos go here — drop them into the folder shown on the frame.',
    groups: [
      {
        id: 'graduation',
        title: 'Grade 12 Graduation',
        annotation: 'side by side, before we knew we’d end up together',
        folder: 'public/images/graduation/',
        photos: [
          { src: '/images/graduation/photo_6298612008680625535_y.jpg', caption: 'Where this whole thing started, honestly.', date: null },
        ],
      },
      {
        id: 'bangko-bangko',
        title: 'Bangko Bangko — Iligan City',
        annotation: 'the trip that turned into a chapter of ours',
        folder: 'public/images/bangko-bangko/',
        photos: [
          { src: '/images/bangko-bangko/photo_6298612008680625537_y.jpg', caption: 'Our trip to Bangko Bangko.', date: null },
        ],
      },
      {
        id: 'esplanade',
        title: 'Esplanade & Coastal Road',
        annotation: 'our usual spot for quiet evenings',
        folder: 'public/images/esplanade-coastal-road/',
        photos: [
          { src: '/images/esplanade-coastal-road/photo_6300863808494309805_y.jpg', caption: 'An evening at the Esplanade.', date: null },
          { src: '/images/esplanade-coastal-road/photo_6300863808494309806_y.jpg', caption: 'Another one from the coastal road.', date: null },
        ],
      },
      {
        id: 'jogging',
        title: 'July Jogging',
        annotation: 'ordinary miles, side by side',
        folder: 'public/images/july-jogging/',
        photos: [
          { src: '/images/july-jogging/photo_6300863808494309807_y.jpg', caption: 'Some of those July miles.', date: null },
        ],
      },
      {
        id: 'sleeping',
        title: 'A Random Moment I Kept',
        annotation: 'no occasion. I just wanted to keep it.',
        special: 'sleeping',
        folder: 'public/images/little-moments/',
        photos: [
          { src: '/images/little-moments/photo_6300863808494309809_y.jpg', caption: 'You, asleep, leaning on me. Nothing remarkable happened that day. That’s exactly why I love this photo. Ordinary moments with you are the ones I’d choose again and again.', date: null },
        ],
      },
      {
        id: 'little-moments',
        title: 'Little Moments',
        annotation: 'the in-between moments',
        folder: 'public/images/little-moments/',
        photos: [
          { src: '/images/little-moments/photo_6300863808494309808_y.jpg', caption: 'You, at the table, taking your shot.', date: null },
          { src: '/images/little-moments/photo_6300863808494309810_y.jpg', caption: 'One more little moment, kept just because.', date: null },
        ],
      },
    ],
  },

  stars: {
    chapterLabel: 'Chapter Six',
    title: 'Still Writing',
    intro: 'Every star up there is a real memory of ours. Tap them, one by one.',
    promptAfterAll: 'One more star has appeared — the dimmest, quietest one. It’s waiting.',
    counterTemplate: 'n of n memories',
    finalStarLabel: 'the one I never won',
    letter: {
      title: 'For Nikki',
      paragraphs: [
        'You know the story by now. I’ve beaten practically everyone at chess — even the strongest player in our class. But you? I never won. Not once.',
        'I’ve stopped wanting to. Because somewhere between you replying to my Messenger notes that summer, and you asking if you could sit beside me at 9 PM on some Palakasan night, the games stopped being about winning. You became the thing I noticed.',
        'And I notice everything. That little hehehe. The hand that finds mine when we walk. Ube anything. Shawarma nights. The way you sleep when my arms are wrapped around you. The way you take care of me — reminding me to brush my teeth, scolding me before I even manage to hurt myself — because you care about me even when I forget to care about myself.',
        'I love the ordinary things most. Eating with you always beside me. Naps that turn into hours. Photos like that one of you sleeping on my shoulder — nothing to anyone else, everything to me.',
        'From high school chessboards to Messenger replies to a seat beside me at McDonald’s, everything has been quietly rearranging itself so I’d end up here, writing this to you.',
        'So here’s the truth I’ve been saving for last: I don’t just want you in my present. I want you in my future — whoever we become, wherever we go, I want the days I haven’t lived to have you in them.',
        'You are the one game I never want to win. Losing to you, every single time, is the best thing that has ever happened to me.',
        'I love you, Nikki. Palangga ta ka.',
      ],
      signoff: '— Hamid',
    },
  },

  music: {
    // Drop a file into public/audio/ (e.g. theme.mp3), then set src to '/audio/theme.mp3'.
    src: null,
  },
};
