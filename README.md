## ConqBladeStats.com Web UI

This is the React-based frontend UI for the ConqBladeStats.com website - A statistics aggregator for Conqueror's Blade.

![ConqBladeStats.com Website Screenshot](/images/main-site.png)

### Project Links

* [Web Frontend](https://github.com/Crashdoom/ConqBladeStatsWeb)
* Google Cloud Function (This Project)
* [CloudFlare Workers](https://github.com/Crashdoom/ConqBladeStatsCFW)

### What's the purpose of the site?

The site was created to build up statistics around when players were active on all of the servers across MyGames and Booming Games instances and to provide useful server status information that both companies didn't offer themselves.

Specificially, the statistics are to help Houses and Alliances notice trends of player activity around large events, differences between the start, middle, and end of seasons, and other such occurrences. Data is interesting, pretty, and should always be freely available.

### Why Open Source?

Easy, I may not always be able to identity all of the issues in my code and it's a community interest project that I have no interest in making money on.

I also chose the license I did to enable commercial use of the stats service (in case MyGames or Booming Games wishes to use it themselves and make me obsolete) and to require that the source code be kept open in the interests of the community.

### How is this hosted?

* CloudFlare for providing DNS
* CloudFlare Workers for a reverse proxy to the Google Cloud hosted frontend, and for running the API
* Google Cloud Functions for polling the statistics servers
* Google Cloud Storage for hosting the frontend files (index.html and main.bundle.js)

### Can I help towards infrastructure costs?

Again, while I don't want to make money from this, I do operate a number of community interest projects and I'm always looking to start more, so if you do wish to leave a Ko-fi donation that's what it'll go towards. (Though I may get a coffee from time to time to keep me going.)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/H2H67UBO)