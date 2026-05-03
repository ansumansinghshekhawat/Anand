PORTFOLIO WEBSITE BACKGROUND IMPLEMENTATION PROMPT
I have a React + TypeScript + Vite portfolio website that needs background animations integrated. I'm providing you with:

120 JPG frames for the HERO → ABOUT section (parallax effect)
120 JPG frames for the EXPERIENCE section (parallax effect)
1 MP4 video for the FINAL section (looping background)

PROJECT STRUCTURE
Current App.tsx has these main sections:

HERO Section (lines 78-154): White background, needs parallax image frames
ABOUT Section (lines 172-223): Continuation of hero parallax
EXPERIENCE Section (lines 225-354): Needs its own parallax frames
CURRENT ROLE Section (lines 356-415): Continuation of experience
FINAL Section (lines 417-493): Black background (bg-black), needs video overlay

TASK: IMPLEMENT THREE BACKGROUND LAYERS
PART 1: HERO → ABOUT SECTION PARALLAX BACKGROUND
Trigger: When user scrolls from page start to About section (scrollYProgress: 0 to 0.4)
Requirements:

Use 120 JPG frames that create a smooth parallax animation
Frames animate based on scroll position (NOT time-based)
As user scrolls down, show different frames sequentially
Apply parallax effect: background moves slower than text elements
Text should remain readable with proper contrast (dark text on the frames)
The frame sequence should complete by the time user reaches the About section fully

Implementation approach:

Create a function that selects the right frame number based on scrollYProgress
Map scrollYProgress (0 to 0.4) to frame numbers (1 to 120)
Use motion/react useTransform to create the frame index
Display the image dynamically: /src/backgrounds/hero/ezgif-frame-{frameNumber}.jpg
Apply transform: useTransform(scrollYProgress, [0, 0.4], [0, -300]) for slight parallax movement

Code structure:
tsxconst frameNumber = useTransform(scrollYProgress, [0, 0.4], [1, 120]);
const backgroundParallaxY = useTransform(scrollYProgress, [0, 0.4], [0, -300]);

PART 2: EXPERIENCE SECTION PARALLAX BACKGROUND
Trigger: When user scrolls through Experience sections (scrollYProgress: 0.25 to 0.75)
Requirements:

Use different set of 120 JPG frames for the experience section
Animate parallax effect as user scrolls through both experience sections
Background should change/animate as user goes from Past Experience → Current Role
Similar parallax effect: background moves slower than scroll
Maintain text readability over the background

Implementation approach:

Map scrollYProgress (0.25 to 0.75) to frame numbers (1 to 120)
Apply to both ExperienceSection and CurrentRoleSection components
Use same dynamic image loading: /src/backgrounds/experience/ezgif-frame-{frameNumber}.jpg
Apply parallax transform with slightly different offset

Code structure:
tsx// For both Experience and Current Role sections
const experienceFrameNumber = useTransform(scrollYProgress, [0.25, 0.75], [1, 120]);
const experienceParallaxY = useTransform(scrollYProgress, [0.25, 0.75], [0, -400]);

PART 3: FINAL SECTION VIDEO BACKGROUND
Trigger: When user scrolls to the final section (scrollYProgress: 0.9 to 1.0)
Requirements:

REMOVE the current black background (bg-black)
Replace with MP4 video that loops continuously
Video should be the full background of the Final section
Text content should overlay on top with proper contrast
Video should have dark overlay to maintain text readability (use existing gradient overlay)
No black background color needed

Implementation approach:

Replace bg-black className with a video element
Video source: /src/backgrounds/final/Firefly_A_high-quality_3D_globe_with_realistic_geography_and_subtle_lighting___rotating_smoothly_360.mp4
Use existing gradient overlay: bg-gradient-to-t from-black/60 to-transparent
Remove the hardcoded black background color

Code structure - Replace existing video reference with new path:
tsx<video 
  src="/src/backgrounds/final/[your_video_filename].mp4" 
  autoPlay 
  loop 
  muted 
  playsInline 
  className="absolute inset-0 w-full h-full object-cover"
/>

FILE STRUCTURE TO CREATE
Place your uploaded files in the project like this:
src/
├── backgrounds/
│   ├── hero/
│   │   ├── ezgif-frame-001.jpg
│   │   ├── ezgif-frame-002.jpg
│   │   └── ... (up to frame-120.jpg)
│   ├── experience/
│   │   ├── ezgif-frame-001.jpg
│   │   ├── ezgif-frame-002.jpg
│   │   └── ... (up to frame-120.jpg)
│   └── final/
│       └── Firefly_globe_video.mp4
├── App.tsx (MODIFIED)
├── main.tsx
├── index.css
└── ...

IMPLEMENTATION CHECKLIST
General Requirements

 Use motion/react library (already in your dependencies) for animations
 Use useTransform to map scrollYProgress to frame numbers
 Frame numbers should be integers (0-120 range, or 1-120 depending on naming)
 Use Math.round() to ensure integer frame selection
 Test parallax effect: background should move slower than text (verify with scroll)

For Frame-based Images

 Create utility function to format frame numbers: ezgif-frame-${String(frameNumber).padStart(3, '0')}.jpg
 Use motion.img for animated image updates based on frameNumber transform
 Ensure images are optimized (JPEG already compressed)
 Add loading state or use CSS to fade between frames smoothly

For Final Section Video

 Replace bg-black with video element
 Keep existing bg-gradient-to-t from-black/60 to-transparent overlay for text contrast
 Ensure video loops properly without jump/gap
 Test on mobile - video should be responsive (object-cover)
 Verify text remains readable over video background

Performance Optimization

 Lazy load images (next frame loads while current displays)
 Consider using Intersection Observer for video (start playback only when visible)
 Test performance on throttled connection (slow 3G)
 Verify no layout shift as images load


SPECIFIC CODE MODIFICATIONS NEEDED
Modify Hero Section Header:
tsx// Add frame number transform
const heroFrameNumber = useTransform(scrollYProgress, [0, 0.4], [1, 120]);

// Inside the sticky hero div, ADD:
<motion.div 
  className="absolute inset-0 z-0"
>
  <motion.img
    src={`/src/backgrounds/hero/ezgif-frame-${heroFrameNumber}.jpg`}
    alt="Hero Background"
    className="w-full h-full object-cover"
  />
</motion.div>
Modify Experience Section:
tsx// Inside ExperienceSection and CurrentRoleSection components
const experienceFrameNumber = useTransform(scrollYProgress, [0.25, 0.75], [1, 120]);

// ADD background image layer similar to hero
<motion.div className="absolute inset-0 z-0">
  <motion.img
    src={`/src/backgrounds/experience/ezgif-frame-${experienceFrameNumber}.jpg`}
    alt="Experience Background"
    className="w-full h-full object-cover"
  />
</motion.div>
Modify Final Section:
tsx// Remove: className="... bg-black ..."
// Add video element with proper z-index management
// Replace the existing video src with the new one

// Ensure structure:
// - Video layer (z-0 or z-1)
// - Gradient overlay (z-5)
// - Content layer (z-10)

TESTING CHECKLIST
After implementation:

 Hero frames display correctly as you scroll from 0 → 0.4
 Parallax effect visible: background moves slower than text
 No jarring transitions between frames
 Text remains readable (check contrast ratio)
 Scroll to About section: transition smooth
 Experience frames display correctly from 0.25 → 0.75
 Scroll to Final section: video plays and loops
 Video background doesn't cause layout shift
 On mobile (375px width): all backgrounds scale properly
 Performance: smooth 60fps scrolling (check DevTools Performance tab)
 No console errors related to missing images/video


ADDITIONAL NOTES

Frame Padding: Ensure your frame filenames match exactly (001, 002, etc. with padding)
Z-index Management: Background layers should be z-0 or z-1, content should be z-10+
Motion Values: Don't convert motion values to strings directly; use template strings properly
Mobile Optimization: Test extensively on small screens (iPhone size)
Video Performance: MP4 is good; ensure it's compressed for web (under 50MB ideally)
Browser Compatibility: Test in Chrome, Firefox, Safari


QUESTIONS FOR CLARIFICATION
If you encounter issues:

Do the frame files have zero-padding (001 vs 1)?
Should parallax effect move the background up or down as you scroll?
Do you want fade transition between frames, or instant frame changes?
Should the video in Final section have sound, or stay muted?
Do you want text to follow the parallax too, or only background?

