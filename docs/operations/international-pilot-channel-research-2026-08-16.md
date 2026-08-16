# International pilot channel research — 2026-08-16

Status: HOLD — research and human-review queue only. No post, direct message,
vote, follow, or launch has been executed from this document.

## Decision

Use GitHub as the durable home, then test one community channel at a time
after the current PR #44 candidate is merged, deployed, and rechecked at the
canonical HTTPS URL. The first public learning goal is five unguided sessions
and three concrete reports, not a star count.

The current hosted URL still serves the previous bundle. Until the release
gate passes, every channel below remains `HOLD`; a visitor must not be asked to
evaluate a product version that differs from the evidence we intend to learn
from.

## Channel fit and gate

| Channel | What it is good for | Current fit | Entry gate | Stop condition |
| --- | --- | --- | --- | --- |
| GitHub repository and profile | Durable proof: source, README, issues, releases, topics, and a project a technical PM can inspect | Primary | Canonical URL and README must describe the same released behavior; keep claims tied to current evidence | README, topics, screenshots, or profile imply adoption or AI capability that has not been verified |
| Product Hunt | A live product launch where people can try the product immediately and discuss the maker's reasoning | Later, not first | Hosted product is live, useful, understandable, and ready for a public launch; prepare a draft first | Product is still a preview, only offers a signup, or the launch copy relies on promises instead of a usable flow |
| Hacker News / Show HN | Technical discussion around something people can directly use or inspect | Conditional | A stable public demo or repository, a concise explanation of what was built, and an owner ready to answer technical questions | The post is primarily promotion, the demo breaks, or replies cannot be handled by the owner |
| Indie Hackers | Founder/product discussion, learning-in-public, and a problem-first conversation | Conditional | Participate as a member, lead with the PM problem and a concrete question, and follow the current community rules | The post is only a link drop, the content gives no useful learning, or the account is present only to promote |
| r/ProductManagement | Practitioner feedback about PM work, not a launch audience | No top-level promotion for now | Manually read the current subreddit rules immediately before any action; only post where the format explicitly permits it, with disclosure | The current rules prohibit self-promotion, research recruitment, or external links; do not route around the rule |

This order keeps the high-context, durable surface first and avoids spending
public trust on a launch before the hosted product and session evidence are
ready.

## Evidence from current platform guidance

- GitHub says a repository README should explain why a project is useful and
  how to use it; repository topics help people find projects and communities;
  and a profile README plus pinned repositories help visitors understand the
  work behind an account. See [Customizing your repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository),
  [Classifying your repository with topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics),
  and [Customizing your profile](https://docs.github.com/en/account-and-profile/how-tos/profile-customization).
- Product Hunt's current guidance prioritizes live products and evaluates
  usefulness, novelty, craft, and creativity. Its posting guide recommends a
  direct product URL, a short description, named makers, and a first comment;
  it also supports creating a draft before scheduling. See [Featuring
  Guidelines](https://help.producthunt.com/en/articles/9883485-product-hunt-featuring-guidelines),
  [How to post a product](https://help.producthunt.com/en/articles/479557-how-to-post-a-product),
  and [Can I submit an unreleased product?](https://help.producthunt.com/en/articles/484932-can-i-submit-an-unreleased-product).
- Hacker News provides dedicated [Show HN guidelines](https://news.ycombinator.com/showhn.html)
  and general [Hacker News guidelines](https://news.ycombinator.com/newsguidelines.html).
  Treat the channel as a technical conversation around a real thing, not as a
  generic traffic blast; the account owner must be available for substantive
  replies.
- Indie Hackers' own community-marketing guidance says to understand each
  community's rules, lead with the audience's problem, ask a real question,
  and add value beyond a link. See [How do you make a successful post on
  Indie Hackers?](https://www.indiehackers.com/post/how-do-you-make-a-successful-post-on-indie-hackers-f6745260fd)
  and [Guide: How to do community-based marketing](https://www.indiehackers.com/post/how-to-sell-in-communities-without-getting-banned-ee5c766673).
- The [r/ProductManagement rules page](https://www.reddit.com/r/ProductManagement/about/rules/)
  is the required source of truth immediately before any Reddit action. The
  page is not fully readable without an authenticated moderator view in the
  current research environment, so the channel stays `HOLD` rather than
  guessing from old discussion threads.

## Release-to-learning sequence

1. **Release proof:** obtain explicit approval for the merge and Pages deploy;
   run the canonical HTTPS verifier, a fresh Chrome Extension desktop/mobile
   trace, and record served asset hashes.
2. **Private rehearsal:** personally run the English session kit from a clean
   browser context. Confirm the participant can reach `Collect → Verify →
   Decide → Ship`, expand a source, review a claim, see a blocked decision
   state, and recover after refresh.
3. **Small public pilot:** use one reviewed invitation in one suitable
   community. Ask for one five-minute unguided run and one concrete hesitation;
   never require a star.
4. **Learning closeout:** record only de-identified, environment-level
   observations. Separate owner QA from non-owner reports, fix one repeated
   issue if warranted, and re-run the hosted audit.
5. **Promotion decision:** only after five non-owner sessions and three concrete
   reports may we consider a second channel. A star, page view, screenshot, or
   a positive comment alone is not a promotion gate.

## English copy guard

Use the smallest truthful description:

> PM Signal Lab is a small English-first worksheet for keeping a product signal
> beside its source, reviewing what the line can support, and naming the
> smallest next test.

State the current boundary plainly: the hosted demo is deterministic and
local-first; it has no external model provider, login, API key, telemetry, or
automatic GitHub action. Do not use `AI-powered`, `autonomous PM`,
`production-ready`, `validated`, `viral`, `used by`, `thousands`, or
`10,000 stars` as product claims.

## Operating boundary

The existing weekly pulse may read public repository metadata, CI state, open
feedback items, and release state, then prepare a review artifact. It may not
publish, reply, DM, vote, star, follow, impersonate a participant, recruit
testers without review, or turn a draft into a public launch.

The next external action is therefore a human decision: approve the exact
merge-and-deploy operation for PR #44. Until that approval is given, this
research remains a release-safe queue and the five-session adoption target is
`未驗證`.
