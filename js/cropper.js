/*
 * imgAreaSelect jQuery plugin
 * version 0.9.10
 *
 * Copyright (c) 2008-2013 Michal Wojciechowski (odyniec.net)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://odyniec.net/projects/imgareaselect/
 *
 */

(function ($) {

    var abs = Math.abs,
        max = Math.max,
        min = Math.min,
        round = Math.round;

    function div() {
        return $('<div/>');
    }

    $.imgAreaSelect = function (img, options) {
        var

            $img = $(img),

            imgLoaded,

            $box = div(),
            $area = div(),
            $border = div().add(div()).add(div()).add(div()),
            $outer = div().add(div()).add(div()).add(div()),
            $handles = $([]),

            $areaOpera,

            left, top,

            imgOfs = { left: 0, top: 0 },

            imgWidth, imgHeight,

            $parent,

            parOfs = { left: 0, top: 0 },

            zIndex = 0,

            position = 'absolute',

            startX, startY,

            scaleX, scaleY,

            resize,

            minWidth, minHeight, maxWidth, maxHeight,

            aspectRatio,

            shown,

            x1, y1, x2, y2,

            selection = { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 },

            docElem = document.documentElement,

            ua = navigator.userAgent,

            $p, d, i, o, w, h, adjusted;

        function viewX(x) {
            return x + imgOfs.left - parOfs.left;
        }

        function viewY(y) {
            return y + imgOfs.top - parOfs.top;
        }

        function selX(x) {
            return x - imgOfs.left + parOfs.left;
        }

        function selY(y) {
            return y - imgOfs.top + parOfs.top;
        }

        function evX(event) {
            return event.pageX - parOfs.left;
        }

        function evY(event) {
            return event.pageY - parOfs.top;
        }

        function getSelection(noScale) {
            var sx = noScale || scaleX, sy = noScale || scaleY;

            return {
                x1: round(selection.x1 * sx),
                y1: round(selection.y1 * sy),
                x2: round(selection.x2 * sx),
                y2: round(selection.y2 * sy),
                width: round(selection.x2 * sx) - round(selection.x1 * sx),
                height: round(selection.y2 * sy) - round(selection.y1 * sy)
            };
        }

        function setSelection(x1, y1, x2, y2, noScale) {
            var sx = noScale || scaleX, sy = noScale || scaleY;

            selection = {
                x1: round(x1 / sx || 0),
                y1: round(y1 / sy || 0),
                x2: round(x2 / sx || 0),
                y2: round(y2 / sy || 0)
            };

            selection.width = selection.x2 - selection.x1;
            selection.height = selection.y2 - selection.y1;
        }

        function adjust() {
            if (!imgLoaded || !$img.width())
                return;

            imgOfs = { left: round($img.offset().left), top: round($img.offset().top) };

            imgWidth = $img.innerWidth();
            imgHeight = $img.innerHeight();

            imgOfs.top += ($img.outerHeight() - imgHeight) >> 1;
            imgOfs.left += ($img.outerWidth() - imgWidth) >> 1;

            minWidth = round(options.minWidth / scaleX) || 0;
            minHeight = round(options.minHeight / scaleY) || 0;
            maxWidth = round(min(options.maxWidth / scaleX || 1 << 24, imgWidth));
            maxHeight = round(min(options.maxHeight / scaleY || 1 << 24, imgHeight));

            if ($().jquery == '1.3.2' && position == 'fixed' &&
                !docElem['getBoundingClientRect']) {
                imgOfs.top += max(document.body.scrollTop, docElem.scrollTop);
                imgOfs.left += max(document.body.scrollLeft, docElem.scrollLeft);
            }

            parOfs = /absolute|relative/.test($parent.css('position')) ?
                {
                    left: round($parent.offset().left) - $parent.scrollLeft(),
                    top: round($parent.offset().top) - $parent.scrollTop()
                } :
                position == 'fixed' ?
                    { left: $(document).scrollLeft(), top: $(document).scrollTop() } :
                    { left: 0, top: 0 };

            left = viewX(0);
            top = viewY(0);

            if (selection.x2 > imgWidth || selection.y2 > imgHeight)
                doResize();
        }

        function update(resetKeyPress) {
            if (!shown) return;

            $box.css({ left: viewX(selection.x1), top: viewY(selection.y1) })
                .add($area).width(w = selection.width).height(h = selection.height);

            $area.add($border).add($handles).css({ left: 0, top: 0 });

            $border
                .width(max(w - $border.outerWidth() + $border.innerWidth(), 0))
                .height(max(h - $border.outerHeight() + $border.innerHeight(), 0));

            $($outer[0]).css({
                left: left, top: top,
                width: selection.x1, height: imgHeight
            });
            $($outer[1]).css({
                left: left + selection.x1, top: top,
                width: w, height: selection.y1
            });
            $($outer[2]).css({
                left: left + selection.x2, top: top,
                width: imgWidth - selection.x2, height: imgHeight
            });
            $($outer[3]).css({
                left: left + selection.x1, top: top + selection.y2,
                width: w, height: imgHeight - selection.y2
            });

            w -= $handles.outerWidth();
            h -= $handles.outerHeight();

            switch ($handles.length) {
                case 8:
                    $($handles[4]).css({ left: w >> 1 });
                    $($handles[5]).css({ left: w, top: h >> 1 });
                    $($handles[6]).css({ left: w >> 1, top: h });
                    $($handles[7]).css({ top: h >> 1 });
                case 4:
                    $handles.slice(1, 3).css({ left: w });
                    $handles.slice(2, 4).css({ top: h });
            }

            if (resetKeyPress !== false) {
                if ($.imgAreaSelect.onKeyPress != docKeyPress)
                    $(document).unbind($.imgAreaSelect.keyPress,
                        $.imgAreaSelect.onKeyPress);

                if (options.keys)
                    $(document)[$.imgAreaSelect.keyPress](
                        $.imgAreaSelect.onKeyPress = docKeyPress);
            }

            if (msie && $border.outerWidth() - $border.innerWidth() == 2) {
                $border.css('margin', 0);
                setTimeout(function () { $border.css('margin', 'auto'); }, 0);
            }
        }

        function doUpdate(resetKeyPress) {
            adjust();
            update(resetKeyPress);
            x1 = viewX(selection.x1); y1 = viewY(selection.y1);
            x2 = viewX(selection.x2); y2 = viewY(selection.y2);
        }

        function hide($elem, fn) {
            options.fadeSpeed ? $elem.fadeOut(options.fadeSpeed, fn) : $elem.hide();

        }

        function areaMouseMove(event) {
            var x = selX(evX(event)) - selection.x1,
                y = selY(evY(event)) - selection.y1;

            if (!adjusted) {
                adjust();
                adjusted = true;

                $box.one('mouseout', function () { adjusted = false; });
            }

            resize = '';

            if (options.resizable) {
                if (y <= options.resizeMargin)
                    resize = 'n';
                else if (y >= selection.height - options.resizeMargin)
                    resize = 's';
                if (x <= options.resizeMargin)
                    resize += 'w';
                else if (x >= selection.width - options.resizeMargin)
                    resize += 'e';
            }

            $box.css('cursor', resize ? resize + '-resize' :
                options.movable ? 'move' : '');
            if ($areaOpera)
                $areaOpera.toggle();
        }

        function docMouseUp(event) {
            $('body').css('cursor', '');
            if (options.autoHide || selection.width * selection.height == 0)
                hide($box.add($outer), function () { $(this).hide(); });

            $(document).unbind('mousemove', selectingMouseMove);
            $box.mousemove(areaMouseMove);

            options.onSelectEnd(img, getSelection());
        }

        function areaMouseDown(event) {
            if (event.which != 1) return false;

            adjust();

            if (resize) {
                $('body').css('cursor', resize + '-resize');

                x1 = viewX(selection[/w/.test(resize) ? 'x2' : 'x1']);
                y1 = viewY(selection[/n/.test(resize) ? 'y2' : 'y1']);

                $(document).mousemove(selectingMouseMove)
                    .one('mouseup', docMouseUp);
                $box.unbind('mousemove', areaMouseMove);
            }
            else if (options.movable) {
                startX = left + selection.x1 - evX(event);
                startY = top + selection.y1 - evY(event);

                $box.unbind('mousemove', areaMouseMove);

                $(document).mousemove(movingMouseMove)
                    .one('mouseup', function () {
                        options.onSelectEnd(img, getSelection());

                        $(document).unbind('mousemove', movingMouseMove);
                        $box.mousemove(areaMouseMove);
                    });
            }
            else
                $img.mousedown(event);

            return false;
        }

        function fixAspectRatio(xFirst) {
            if (aspectRatio)
                if (xFirst) {
                    x2 = max(left, min(left + imgWidth,
                        x1 + abs(y2 - y1) * aspectRatio * (x2 > x1 || -1)));

                    y2 = round(max(top, min(top + imgHeight,
                        y1 + abs(x2 - x1) / aspectRatio * (y2 > y1 || -1))));
                    x2 = round(x2);
                }
                else {
                    y2 = max(top, min(top + imgHeight,
                        y1 + abs(x2 - x1) / aspectRatio * (y2 > y1 || -1)));
                    x2 = round(max(left, min(left + imgWidth,
                        x1 + abs(y2 - y1) * aspectRatio * (x2 > x1 || -1))));
                    y2 = round(y2);
                }
        }

        function doResize() {
            x1 = min(x1, left + imgWidth);
            y1 = min(y1, top + imgHeight);

            if (abs(x2 - x1) < minWidth) {
                x2 = x1 - minWidth * (x2 < x1 || -1);

                if (x2 < left)
                    x1 = left + minWidth;
                else if (x2 > left + imgWidth)
                    x1 = left + imgWidth - minWidth;
            }

            if (abs(y2 - y1) < minHeight) {
                y2 = y1 - minHeight * (y2 < y1 || -1);

                if (y2 < top)
                    y1 = top + minHeight;
                else if (y2 > top + imgHeight)
                    y1 = top + imgHeight - minHeight;
            }

            x2 = max(left, min(x2, left + imgWidth));
            y2 = max(top, min(y2, top + imgHeight));

            fixAspectRatio(abs(x2 - x1) < abs(y2 - y1) * aspectRatio);

            if (abs(x2 - x1) > maxWidth) {
                x2 = x1 - maxWidth * (x2 < x1 || -1);
                fixAspectRatio();
            }

            if (abs(y2 - y1) > maxHeight) {
                y2 = y1 - maxHeight * (y2 < y1 || -1);
                fixAspectRatio(true);
            }

            selection = {
                x1: selX(min(x1, x2)), x2: selX(max(x1, x2)),
                y1: selY(min(y1, y2)), y2: selY(max(y1, y2)),
                width: abs(x2 - x1), height: abs(y2 - y1)
            };

            update();

            options.onSelectChange(img, getSelection());
        }

        function selectingMouseMove(event) {
            x2 = /w|e|^$/.test(resize) || aspectRatio ? evX(event) : viewX(selection.x2);
            y2 = /n|s|^$/.test(resize) || aspectRatio ? evY(event) : viewY(selection.y2);

            doResize();

            return false;

        }

        function doMove(newX1, newY1) {
            x2 = (x1 = newX1) + selection.width;
            y2 = (y1 = newY1) + selection.height;

            $.extend(selection, {
                x1: selX(x1), y1: selY(y1), x2: selX(x2),
                y2: selY(y2)
            });

            update();

            options.onSelectChange(img, getSelection());
        }

        function movingMouseMove(event) {
            x1 = max(left, min(startX + evX(event), left + imgWidth - selection.width));
            y1 = max(top, min(startY + evY(event), top + imgHeight - selection.height));

            doMove(x1, y1);

            event.preventDefault();

            return false;
        }

        function startSelection() {
            $(document).unbind('mousemove', startSelection);
            adjust();

            x2 = x1;
            y2 = y1;

            doResize();

            resize = '';

            if (!$outer.is(':visible'))
                $box.add($outer).hide().fadeIn(options.fadeSpeed || 0);

            shown = true;

            $(document).unbind('mouseup', cancelSelection)
                .mousemove(selectingMouseMove).one('mouseup', docMouseUp);
            $box.unbind('mousemove', areaMouseMove);

            options.onSelectStart(img, getSelection());
        }

        function cancelSelection() {
            $(document).unbind('mousemove', startSelection)
                .unbind('mouseup', cancelSelection);
            hide($box.add($outer));

            setSelection(selX(x1), selY(y1), selX(x1), selY(y1));

            if (!(this instanceof $.imgAreaSelect)) {
                options.onSelectChange(img, getSelection());
                options.onSelectEnd(img, getSelection());
            }
        }

        function imgMouseDown(event) {
            if (event.which != 1 || $outer.is(':animated')) return false;

            adjust();
            startX = x1 = evX(event);
            startY = y1 = evY(event);

            $(document).mousemove(startSelection).mouseup(cancelSelection);

            return false;
        }

        function windowResize() {
            doUpdate(false);
        }

        function imgLoad() {
            imgLoaded = true;

            setOptions(options = $.extend({
                classPrefix: 'imgareaselect',
                movable: true,
                parent: 'body',
                resizable: true,
                resizeMargin: 10,
                onInit: function () { },
                onSelectStart: function () { },
                onSelectChange: function () { },
                onSelectEnd: function () { }
            }, options));

            $box.add($outer).css({ visibility: '' });

            if (options.show) {
                shown = true;
                adjust();
                update();
                $box.add($outer).hide().fadeIn(options.fadeSpeed || 0);
            }

            setTimeout(function () { options.onInit(img, getSelection()); }, 0);
        }

        var docKeyPress = function (event) {
            var k = options.keys, d, t, key = event.keyCode;

            d = !isNaN(k.alt) && (event.altKey || event.originalEvent.altKey) ? k.alt :
                !isNaN(k.ctrl) && event.ctrlKey ? k.ctrl :
                    !isNaN(k.shift) && event.shiftKey ? k.shift :
                        !isNaN(k.arrows) ? k.arrows : 10;

            if (k.arrows == 'resize' || (k.shift == 'resize' && event.shiftKey) ||
                (k.ctrl == 'resize' && event.ctrlKey) ||
                (k.alt == 'resize' && (event.altKey || event.originalEvent.altKey))) {
                switch (key) {
                    case 37:
                        d = -d;
                    case 39:
                        t = max(x1, x2);
                        x1 = min(x1, x2);
                        x2 = max(t + d, x1);
                        fixAspectRatio();
                        break;
                    case 38:
                        d = -d;
                    case 40:
                        t = max(y1, y2);
                        y1 = min(y1, y2);
                        y2 = max(t + d, y1);
                        fixAspectRatio(true);
                        break;
                    default:
                        return;
                }

                doResize();
            }
            else {
                x1 = min(x1, x2);
                y1 = min(y1, y2);

                switch (key) {
                    case 37:
                        doMove(max(x1 - d, left), y1);
                        break;
                    case 38:
                        doMove(x1, max(y1 - d, top));
                        break;
                    case 39:
                        doMove(x1 + min(d, imgWidth - selX(x2)), y1);
                        break;
                    case 40:
                        doMove(x1, y1 + min(d, imgHeight - selY(y2)));
                        break;
                    default:
                        return;
                }
            }

            return false;
        };

        function styleOptions($elem, props) {
            for (var option in props)
                if (options[option] !== undefined)
                    $elem.css(props[option], options[option]);
        }

        function setOptions(newOptions) {
            if (newOptions.parent)
                ($parent = $(newOptions.parent)).append($box.add($outer));

            $.extend(options, newOptions);

            adjust();

            if (newOptions.handles != null) {
                $handles.remove();
                $handles = $([]);

                i = newOptions.handles ? newOptions.handles == 'corners' ? 4 : 8 : 0;

                while (i--)
                    $handles = $handles.add(div());

                $handles.addClass(options.classPrefix + '-handle').css({
                    position: 'absolute',
                    fontSize: 0,
                    zIndex: zIndex + 1 || 1
                });

                if (!parseInt($handles.css('width')) >= 0)
                    $handles.width(5).height(5);

                if (o = options.borderWidth)
                    $handles.css({ borderWidth: o, borderStyle: 'solid' });

                styleOptions($handles, {
                    borderColor1: 'border-color',
                    borderColor2: 'background-color',
                    borderOpacity: 'opacity'
                });
            }

            scaleX = options.imageWidth / imgWidth || 1;
            scaleY = options.imageHeight / imgHeight || 1;

            if (newOptions.x1 != null) {
                setSelection(newOptions.x1, newOptions.y1, newOptions.x2,
                    newOptions.y2);
                newOptions.show = !newOptions.hide;
            }

            if (newOptions.keys)
                options.keys = $.extend({ shift: 1, ctrl: 'resize' },
                    newOptions.keys);

            $outer.addClass(options.classPrefix + '-outer');
            $area.addClass(options.classPrefix + '-selection');
            for (i = 0; i++ < 4;)
                $($border[i - 1]).addClass(options.classPrefix + '-border' + i);

            styleOptions($area, {
                selectionColor: 'background-color',
                selectionOpacity: 'opacity'
            });
            styleOptions($border, {
                borderOpacity: 'opacity',
                borderWidth: 'border-width'
            });
            styleOptions($outer, {
                outerColor: 'background-color',
                outerOpacity: 'opacity'
            });
            if (o = options.borderColor1)
                $($border[0]).css({ borderStyle: 'solid', borderColor: o });
            if (o = options.borderColor2)
                $($border[1]).css({ borderStyle: 'dashed', borderColor: o });

            $box.append($area.add($border).add($areaOpera)).append($handles);

            if (msie) {
                if (o = ($outer.css('filter') || '').match(/opacity=(\d+)/))
                    $outer.css('opacity', o[1] / 100);
                if (o = ($border.css('filter') || '').match(/opacity=(\d+)/))
                    $border.css('opacity', o[1] / 100);
            }

            if (newOptions.hide)
                hide($box.add($outer));
            else if (newOptions.show && imgLoaded) {
                shown = true;
                $box.add($outer).fadeIn(options.fadeSpeed || 0);
                doUpdate();
            }

            aspectRatio = (d = (options.aspectRatio || '').split(/:/))[0] / d[1];

            $img.add($outer).unbind('mousedown', imgMouseDown);

            if (options.disable || options.enable === false) {
                $box.unbind('mousemove', areaMouseMove).unbind('mousedown', areaMouseDown);
                $(window).unbind('resize', windowResize);
            }
            else {
                if (options.enable || options.disable === false) {
                    if (options.resizable || options.movable)
                        $box.mousemove(areaMouseMove).mousedown(areaMouseDown);

                    $(window).resize(windowResize);
                }

                if (!options.persistent)
                    $img.add($outer).mousedown(imgMouseDown);
            }

            options.enable = options.disable = undefined;
        }

        this.remove = function () {
            setOptions({ disable: true });
            $box.add($outer).remove();
        };

        this.getOptions = function () { return options; };

        this.setOptions = setOptions;

        this.getSelection = getSelection;

        this.setSelection = setSelection;

        this.cancelSelection = cancelSelection;

        this.update = doUpdate;

        var msie = (/msie ([\w.]+)/i.exec(ua) || [])[1],
            opera = /opera/i.test(ua),
            safari = /webkit/i.test(ua) && !/chrome/i.test(ua);

        $p = $img;

        while ($p.length) {
            zIndex = max(zIndex,
                !isNaN($p.css('z-index')) ? $p.css('z-index') : zIndex);
            if ($p.css('position') == 'fixed')
                position = 'fixed';

            $p = $p.parent(':not(body)');
        }

        zIndex = options.zIndex || zIndex;

        if (msie)
            $img.attr('unselectable', 'on');

        $.imgAreaSelect.keyPress = msie || safari ? 'keydown' : 'keypress';

        if (opera)

            $areaOpera = div().css({
                width: '100%', height: '100%',
                position: 'absolute', zIndex: zIndex + 2 || 2
            });

        $box.add($outer).css({
            visibility: 'hidden', position: position,
            overflow: 'hidden', zIndex: zIndex || '0'
        });
        $box.css({ zIndex: zIndex + 2 || 2 });
        $area.add($border).css({ position: 'absolute', fontSize: 0 });

        img.complete || img.readyState == 'complete' || !$img.is('img') ?
            imgLoad() : $img.one('load', imgLoad);

        if (!imgLoaded && msie && msie >= 7)
            img.src = img.src;
    };

    $.fn.imgAreaSelect = function (options) {
        options = options || {};

        this.each(function () {
            if ($(this).data('imgAreaSelect')) {
                if (options.remove) {
                    $(this).data('imgAreaSelect').remove();
                    $(this).removeData('imgAreaSelect');
                }
                else
                    $(this).data('imgAreaSelect').setOptions(options);
            }
            else if (!options.remove) {
                if (options.enable === undefined && options.disable === undefined)
                    options.enable = true;

                $(this).data('imgAreaSelect', new $.imgAreaSelect(this, options));
            }
        });

        if (options.instance)
            return $(this).data('imgAreaSelect');

        return this;
    };

})(jQuery);

// Generated by CoffeeScript 2.2.1
(function () {
    // Reference jQuery
    var $;

    $ = jQuery;

    $.awesomeCropper = function (inputAttachTo, options) {
        var $applyButton, $cancelButton, $container, $cropSandbox, $fileSelect, $imagesContainer, $inputAttachTo, $progressBar, $resultIm, $sourceIm, $urlSelect, $urlSelectButton, a, cleanImages, div, drawImage, fileAllowed, handleDragOver, handleDropFileSelect, handleFileSelect, image, input, log, readFile, removeAreaSelect, removeLoading, saveCrop, setAreaSelect, setImages, setLoading, setOriginalSize, settings;
        // Default settings
        settings = {
            width: 100,
            height: 100,
            debug: false
        };
        // Merge default settings with options.
        settings = $.extend(settings, options);
        // Simple logger.
        log = function () {
            if (settings.debug) {
                return typeof console !== "undefined" && console !== null ? console.log(arguments) : void 0;
            }
        };
        // Input
        $inputAttachTo = $(inputAttachTo);
        input = function (type) {
            return $(`<input type = "${type}" />`);
        };
        div = function () {
            return $("<div/>");
        };
        a = function (text) {
            return $(`<a href="#">${text}</a>`);
        };
        image = function () {
            return $('<img/>');
        };
        // Main box
        $container = div().insertAfter($inputAttachTo).addClass('awesome-cropper');
        $cropSandbox = $('<canvas></canvas>');
        $cropSandbox.attr({
            width: settings.width,
            height: settings.height
        });
        $container.append($cropSandbox);
        // File chooser
        $fileSelect = input('file');
        $container.append($fileSelect);
        if (settings.proxy_path !== void 0) {
            // URL input
            $urlSelect = input('text');
            $urlSelectButton = input('button');
            $urlSelectButton.val('Upload from url');
            $container.append(div().addClass('form-group').append($urlSelect).append($urlSelectButton));
        }
        // Progress bar
        $progressBar = div().addClass('progress hide').append(div().addClass('progress-bar').attr({
            role: 'progressbar',
            'aria-valuenow': "60",
            'aria-valuemin': "0",
            'aria-valuemax': "100",
            style: "width: 60%;"
        }));
        $container.append($progressBar);
        // Result Image
        $resultIm = image();
        $container.append($resultIm);
        // Modal dialog with cropping
        $sourceIm = image();
        $applyButton = a('Apply').addClass('btn yes btn-primary');
        $cancelButton = a('Cancel').addClass('btn btn-danger').attr({
            'data-dismiss': "modal"
        });
        $imagesContainer = div().append(div().addClass('modal-dialog').append(div().addClass('modal-content').append(div().addClass('modal-body').append(div().addClass('col-md-9').append($sourceIm)).append(div().addClass('col-md-3').append($cropSandbox)).append(div().addClass('clearfix')), div().addClass('modal-footer').append(div().addClass('btn-group').append($cancelButton).append($applyButton))))).addClass('modal').attr({
            role: 'dialog'
        });
        $container.append($imagesContainer);
        // Plugin UI functions
        removeAreaSelect = function (image) {
            return image.imgAreaSelect({
                remove: true
            });
        };
        cleanImages = function () {
            var im;
            removeAreaSelect($sourceIm);
            im = $sourceIm;
            $sourceIm = image();
            return im.replaceWith($sourceIm);
        };
        setLoading = function () {
            return $progressBar.removeClass('hide');
        };
        removeLoading = function () {
            $imagesContainer.on('shown.bs.modal', function () { }).on('hidden.bs.modal', function () {
                return cleanImages();
            }).modal();
            return $progressBar.addClass('hide');
        };
        setOriginalSize = function (img) {
            var tempImage;
            tempImage = new Image();
            tempImage.onload = function () {
                img.attr({
                    'data-original-width': tempImage.width,
                    'data-original-height': tempImage.height
                });
                return setAreaSelect($sourceIm);
            };
            return tempImage.src = img.attr('src');
        };
        setImages = function (uri) {
            return $sourceIm.attr('src', uri).load(function () {
                removeLoading();
                return setOriginalSize($sourceIm);
            });
        };
        drawImage = function (img, x, y, width, height) {
            var context, destHeight, destWidth, destX, destY, oHeight, oWidth, r, sourceHeight, sourceWidth, sourceX, sourceY;
            oWidth = img.attr('data-original-width');
            oHeight = img.attr('data-original-height');
            if (oWidth > oHeight) {
                r = oHeight / img.height();
            } else {
                r = oWidth / img.width();
            }
            sourceX = Math.round(x * r);
            sourceY = Math.round(y * r);
            sourceWidth = Math.round(width * r);
            sourceHeight = Math.round(height * r);
            destX = 0;
            destY = 0;
            destWidth = settings.width;
            destHeight = settings.height;
            context = $cropSandbox.get(0).getContext('2d');
            return context.drawImage(img.get(0), sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        };
        setAreaSelect = function (image) {
            var viewPort, x2, y2;
            viewPort = $(window).height() - 150;
            if ($sourceIm.height() > viewPort) {
                $sourceIm.css({
                    height: viewPort + "px"
                });
            }
            log(image.width(), image.height());
            if (image.width() / settings.width >= image.height() / settings.height) {
                y2 = image.height();
                x2 = Math.round(settings.width * (image.height() / settings.height));
            } else {
                x2 = image.width();
                y2 = Math.round(settings.height * (image.width() / settings.width));
            }
            log(x2, y2, image.width(), image.height());
            drawImage($sourceIm, 0, 0, x2 - 1, y2 - 1);
            return image.imgAreaSelect({
                aspectRatio: `${settings.width}:${settings.height}`,
                handles: true,
                x1: 0,
                y1: 0,
                x2: x2,
                y2: y2,
                onSelectEnd: (img, selection) => {
                    return drawImage($sourceIm, selection.x1, selection.y1, selection.width - 1, selection.height - 1);
                }
            });
        };
        // Plugin images loading function
        fileAllowed = function (name) {
            var res;
            res = name.match(/\.(jpg|png|gif|jpeg)$/mi);
            if (!res) {
                alert('Only *.jpeg, *.jpg, *.png, *.gif files allowed');
                return false;
            } else {
                return true;
            }
        };
        readFile = function (file) {
            var reader;
            reader = new FileReader();
            setLoading();
            reader.onload = function (e) {
                return setImages(e.target.result);
            };
            return reader.readAsDataURL(file);
        };
        handleDropFileSelect = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (evt.originalEvent.dataTransfer.files[0] !== void 0) {
                if (!fileAllowed(evt.originalEvent.dataTransfer.files[0].name)) {
                    return;
                }
                return readFile(evt.originalEvent.dataTransfer.files[0]);
            }
        };
        handleDragOver = function (e) {
            e.originalEvent.dataTransfer.dropEffect = "copy";
            e.stopPropagation();
            return e.preventDefault();
        };
        handleFileSelect = function (evt) {
            if (evt.target.files[0] !== void 0) {
                if (!fileAllowed(evt.target.files[0].name)) {
                    return;
                }
                readFile(evt.target.files[0]);
                return evt.target.value = "";
            }
        };
        saveCrop = function () {
            var result;
            result = $cropSandbox.get(0).toDataURL();
            $resultIm.attr('src', result);
            $inputAttachTo.val(result);
            return cleanImages();
        };
        // Setup the listeners
        $fileSelect.on('change', handleFileSelect);
        $container.on('dragover', handleDragOver);
        $container.on('drop', handleDropFileSelect);
        if (settings.proxy_path !== void 0) {
            $urlSelect.on('dragover', handleDragOver);
            $urlSelect.on('drop', handleDropFileSelect);
            $urlSelectButton.click(function () {
                var url;
                if (!$urlSelect.val().match(/^(https?:\/\/)?/)) {
                    return;
                }
                if (!fileAllowed($urlSelect.val())) {
                    return;
                }
                setLoading();
                url = settings.proxy_path.replace(/:url/, $urlSelect.val());
                return $.get(url).done(function (data) {
                    return setImages(data);
                }).fail(function (jqXNR, textStatus) {
                    $progressBar.addClass('hide');
                    return alert("Failed to load image");
                });
            });
        }
        $cancelButton.on('click', function () {
            return cleanImages();
        });
        return $applyButton.on('click', function () {
            saveCrop();
            return $imagesContainer.modal('hide');
        });
    };

    /*
     * jQuery Awesome Cropper plugin
     *
     * Copyright 2013 8xx8, vdv73rus
     *
     * v0.0.2
     */
    $.fn.extend({
        awesomeCropper: function (options) {
            return this.each(function () {
                // Is there already an imgAreaSelect instance bound to this element?
                if ($(this).data("awesomeCropper")) {
                    // Yes there is -- is it supposed to be removed?
                    if (options.remove) {
                        // Remove the plugin
                        $(this).data("awesomeCropper").remove();
                        $(this).removeData("awesomeCropper");
                    } else {
                        // Reset options
                        $(this).data("awesomeCropper").setOptions(options);
                    }
                } else if (!options.remove) {
                    // No exising instance -- create a new one

                    $(this).data("awesomeCropper", new $.awesomeCropper(this, options));
                }
                if (options.instance) {
                    return $(this).data("awesomeCropper");
                }
                return this;
            });
        }
    });

}).call(this);