all: chrome.zip firefox.zip

chrome.zip:
	mkdir build-chrome
	jq -s '.[0] * .[1]' manifest-base.json manifest-chrome.json > build-chrome/manifest.json
	cp background.js build-chrome
	cp content.js build-chrome
	cp LICENSE build-chrome
	cp -a images build-chrome
	cd build-chrome && zip -r ../chrome.zip *

firefox.zip:
	mkdir build-firefox
	jq -s '.[0] * .[1]' manifest-base.json manifest-firefox.json > build-firefox/manifest.json
	cp background.js build-firefox
	cp content.js build-firefox
	cp LICENSE build-firefox
	cp -a images build-firefox
	cd build-firefox && zip -r ../firefox.zip *

clean:
	rm -rf build-chrome
	rm -rf build-firefox
	rm chrome.zip
	rm firefox.zip
