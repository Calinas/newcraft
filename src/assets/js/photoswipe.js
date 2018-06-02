

import Vue from 'vue'
Vue.prototype.initPhotoSwipeFromDOM = function(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if (figureEl.nodeType !== 1 || figureEl.tagName.toLowerCase() != 'figure') {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');
            // console.log(size);
            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('data-src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    var createPhotoView = function(eventImg ,extraIndex ,eTarget) {
        // globalApp.hideIndicator();
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes;

        var numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem || childNodes[i].tagName.toLowerCase() != 'figure') {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
    }

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        if (eTarget.nodeName == "IMG") {
            var PWImgSizeElement = eTarget;
            ////        var PWNewImage=new Image;
            ////        PWNewImage.src=PWImgSizeElement.parentNode.href;
            ////        var PWdateSizeWidth=PWNewImage.width;
            ////        var PWdateSizeHeight=PWNewImage.height;
            // globalApp.showIndicator();
            var eventImg = eTarget.parentNode.parentNode.parentNode.children;
            var pwImgNum = 0;
            for (var PWImgNum = 0; PWImgNum < eventImg.length; PWImgNum++) {

                if (eventImg[PWImgNum].tagName.toLowerCase() != 'figure') {
                    pwImgNum++;
                    if (pwImgNum >= eventImg.length) {
                        // globalApp.hideIndicator();
                        var clickedListItem = closest(eTarget, function(el) {
                            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                        });

                        if (!clickedListItem) {
                            return;
                        }

                        // find index of clicked item by looping through all child nodes
                        // alternatively, you may define index via data- attribute
                        var clickedGallery = clickedListItem.parentNode,
                            childNodes = clickedListItem.parentNode.childNodes;


                        var numChildNodes = childNodes.length,
                            nodeIndex = 0,
                            index;

                        for (var i = 0; i < numChildNodes; i++) {
                            if (childNodes[i].nodeType !== 1) {
                                continue;
                            }

                            if (childNodes[i] === clickedListItem || childNodes[i].tagName.toLowerCase() != 'figure') {
                                index = nodeIndex;
                                break;
                            }
                            nodeIndex++;
                        }



                        if (index >= 0) {
                            // open PhotoSwipe if valid index found
                            openPhotoSwipe(index, clickedGallery);
                        }
                        return false;
                    } else {
                        continue;
                    }
                }
                var isExternalSite = false;
                if (eventImg[PWImgNum].children[0].href.indexOf(".91craft.com") == -1) {
                    isExternalSite = true;
                }
                if (isExternalSite) {
                    pwImgNum++;
                    if (pwImgNum >= eventImg.length) {
                        createPhotoView(eventImg ,PWImgNum ,eTarget);
                        return false;
                    }
                } else {
                    $.ajax({
                        url: eventImg[PWImgNum].children[0].href + '?imageInfo',
                        type: "GET",
                        dataType: 'JSON',
                        async: true,
                        extraIndex: PWImgNum,
                        success: function(data) {
                            eventImg[this.extraIndex].children[0].setAttribute("data-size", "" + data.width + "x" + data.height + "");
                            pwImgNum++;
                            if (pwImgNum >= eventImg.length) {
                                createPhotoView(eventImg, this.extraIndex ,eTarget);
                                return false;
                            }
                        }
                    });
                }
            }

            //      oldPWImgSrc=PWImgSizeElement.src;
            //      eTarget.src=PWImgSizeElement.parentNode.href;
            //eTarget.src=oldPWImgSrc;

        }


        // find root element of slide

    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        // console.log('openPhotoSwipe');
        items = parseThumbnailElements(galleryElement);
        //console.log(items);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            history: false,
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        PhotoBrowser = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        PhotoBrowser.init();
        //console.log(gallery);
        PhotoBrowser.listen('destroy', function() {
            setTimeout(function(){
                $('.pswp--open').removeClass('pswp--open');
            },100)
        });
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};