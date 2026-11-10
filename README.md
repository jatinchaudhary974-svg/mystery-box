# Mystery Box

BUILD BRIEF: WHAT'S INSIDE?



Project Overview



Build a premium, dark-themed, browser-based interactive mystery-box experience called "WHAT'S INSIDE?" This is a working project name and must remain easy to change.



Core tagline: "You never know what's inside."



The product is a free digital entertainment experience. Users choose visually identical mystery boxes, watch an opening animation, and receive a completely random digital surprise.



The experience must be lightweight, mobile-first, polished, and immediately understandable.



Do not introduce payments, gambling mechanics, accounts, real-money rewards, misleading rarity systems, or inappropriate content.



1. Technology



Preferred stack:



- React

- TypeScript

- Tailwind CSS

- Framer Motion for animations

- Local TypeScript/JSON surprise collection

- CSS, SVG or Canvas for lightweight visual effects



Use the existing project's architecture if one already exists. Do not replace a working project structure without justification.



The application should work without a backend.



2. Visual Direction



Create a premium mysterious atmosphere.



Palette:



- Background: #101010

- Secondary surface: #202020

- Accent gold: #C6A45D

- Warm off-white: #F0E9DA



Typography:



- Elegant serif for main headings.

- Inter or Manrope for body text.

- Clear, restrained button typography.



Design principles:



- Sophisticated and minimal.

- Generous spacing.

- Identical mystery-box appearance.

- Soft ambient lighting.

- Subtle gold highlights.

- Controlled particle effects.

- No excessive neon, clutter, or generic dashboard styling.



The result should look like a premium digital experience rather than an ordinary utility website.



3. Screens



A. Landing Page



Include:



- WHAT'S INSIDE? wordmark.

- Headline: "You never know what's inside."

- Supporting text: "A little mystery. A little madness. A lot of surprises."

- Prominent mystery-box illustration.

- Primary CTA: "OPEN A BOX".

- Minimal footer.



CTA navigates to the mystery room.



B. Mystery Room



Display a collection of identical interactive boxes.



Requirements:



- Six boxes on desktop where layout permits.

- Four boxes on smaller screens where layout permits.

- Responsive grid.

- Identical dimensions, colours, lighting and appearance.

- No content labels or visual rarity distinctions.

- Keyboard and touch support.

- Clear hover, focus and selected states.



Clicking any box begins the opening sequence.



C. Opening Animation



Create a short cinematic animation:



1. Selected box responds to input.

2. Box shakes slightly.

3. Golden light begins emerging.

4. Lid opens.

5. Particles and glow reveal the surprise.



Target duration approximately two seconds.



Include a Skip Animation control and support reduced-motion preferences.



Prevent double-clicks from triggering multiple reveals.



D. Surprise Reveal



Display:



- Surprise title.

- Surprise-specific visual or interaction.

- Short description.

- Share action.

- Open Another Box action.

- Return to Mystery Room action.



Every reveal should feel complete and visually intentional.



E. Sharing



Implement native browser sharing when available.



Provide a copy-link fallback.



Create a visually attractive share card with:



- Surprise title.

- Illustration.

- Brand wordmark.

- Website URL.

- Invitation: "What's inside your box?"



Do not require login.



4. Surprise Engine



Create at least 25 handcrafted surprise entries.



Five categories:



- Funny

- Visual

- Puzzle

- Wholesome

- Weird



Every entry should include:



- Unique ID.

- Title.

- Category.

- Description.

- Type.

- Optional visual or interaction identifier.

- Share text.



Selection rules:



- Select uniformly from all valid surprises.

- Use equal probability for every entry.

- Allow repeated results.

- Do not implement rarity weights, jackpot mechanics or hidden reward odds.

- Validate the collection before selection.

- Handle an empty collection gracefully.



The first surprise collection should include concepts such as:



- Useless Superpower

- Invisible Trophy

- CEO of Doing Nothing

- Dancing Potato

- Tiny Galaxy

- Liquid Universe

- Golden Particle Storm

- Infinite Tunnel

- Floating Island

- One-Minute Riddle

- Optical Illusion

- Hidden Object

- Pattern Challenge

- Unexpected Answer

- A Little Reminder

- Virtual High Five

- Tiny Appreciation Letter

- Good Things Ahead

- Pocket of Positivity

- What Is This Creature?

- Floating Button

- Impossible Door

- Tiny Digital Planet

- Unexpected Sound

- One additional original surprise.



Do not use generic placeholder text for finished surprises. Write engaging original content and give each visual/interactive surprise its own treatment.



5. Sound



- Sound disabled by default.

- Provide an obvious sound toggle.

- Use short optional UI sound effects.

- Avoid intrusive autoplay.

- Ensure the experience remains complete without sound.



6. Technical Requirements



- Mobile-first responsive implementation.

- Touch-friendly controls.

- Accessible semantic HTML.

- Keyboard navigation.

- Visible focus indicators.

- Screen-reader-friendly button labels.

- Adequate contrast.

- Reduced-motion support.

- Optimized images.

- Lazy-load nonessential assets.

- Avoid unnecessary third-party services.

- No unnecessary collection of personal information.



7. MVP Exclusions



Do not implement:



- User accounts.

- Authentication.

- Payments.

- Subscriptions.

- Multiplayer.

- Leaderboards.

- Daily streaks.

- Backend database.

- AI-generated content.

- Paid or weighted rewards.



8. Quality Assurance



Before declaring completion:



- Verify every screen.

- Test all surprise entries.

- Confirm uniform selection logic.

- Test repeated results.

- Test skip animation.

- Test sound toggle.

- Test share and copy-link fallback.

- Test keyboard navigation.

- Test reduced-motion mode.

- Test mobile layouts.

- Check console errors.

- Run production build.

- Verify the deployed experience if deployment is authorized.



Do not claim a feature works unless it has been tested.



9. Development Approach



Build in stages:



1. Project inspection and architecture.

2. Design system and responsive landing page.

3. Mystery room and box interactions.

4. Opening animation.

5. Surprise data and random engine.

6. Reveal and sharing.

7. Accessibility and responsive QA.

8. Production build.



Preserve existing project files and functionality unless a change is necessary and approved.



Deliver a working, polished MVP—not just static mockups.



Do not deploy or change any production domain without explicit approval.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2afe6c7a-75e3-43e0-b1b2-cb714b39e3f4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
