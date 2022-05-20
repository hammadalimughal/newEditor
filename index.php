<?php
include 'includes/header.php';
$page = 'home';
?>
<main>
    <section class="step img-upload-sec active">
        <div class="upload-nav">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xxl-9 col-xl-10 col-lg-11 col-12">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <a role="button" onclick="history.back()" href="javascript:;"><span><i
                                            class="fa-light fa-angle-left"></i></span>Back</a>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                                <h4>Select an Image</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xxl-6 col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="upload-wrapper">
                        <input type="file" id="uploadImg">
                        <img src="images/upload.svg" alt="">
                        <h6>Drag a photo here to upload</h6>
                        <span>or select from...</span>
                        <label for="uploadImg">your computer</label>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="step crop-image-sec">
        <div class="upload-nav">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xxl-9 col-xl-10 col-lg-11 col-12">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <a role="button" onclick="backStep()" href="javascript:;"><span><i
                                            class="fa-light fa-angle-left"></i></span>change Image</a>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                                <h4>Select an Image</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xxl-6 col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="cropImgWrapper">
                        <img class="uploadedImg" src="images/sample.jpg" alt="">
                    </div>
                    <ul class="crop-options">
                        <li>
                            <a class="icon" href="javascript:;">
                                <i class="fa-regular fa-square"></i>
                            </a>
                            <span>Square</span>
                        </li>
                        <li>
                            <a class="icon active" href="javascript:;">
                                <i class="fa-regular fa-rectangle-vertical"></i>
                            </a>
                            <span>Portrait</span>
                        </li>
                        <li>
                            <a class="icon" href="javascript:;">
                                <i class="fa-regular fa-rectangle"></i>
                            </a>
                            <span>Landscape</span>
                        </li>
                        <li>
                            <a class="icon" href="javascript:;">
                                <i class="fa-regular fa-rotate-left"></i>
                            </a>
                            <span>Rotate</span>
                        </li>
                        <li><a class="continue" href="javascript:;">continue</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section class="step frame-select-sec">
        <div class="container-fluid">
            <div class="editor-wrapper">
                <ul class="frames-left">
                    <li>
                        <a data-style="display:block;position:absolute;top:14.8%;left:30.1%;transform:perspective(1500px)rotateY(24deg);width:59.8%;height:62.8%;object-fit:cover;"
                            class="active" href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/1.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:block;position:absolute;top:10.8%;left:15.1%;width:69.8%;height:74%;object-fit:cover;"
                            href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/2.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:block;position:absolute;top:10.8%;left:15.1%;width:69.8%;height:74%;object-fit:cover;"
                            href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/3.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:none;" href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/4.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:none;" href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/5.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:block;position:absolute;top:13.8%;left:15.3%;width:15.4%;height:21.4%;object-fit:cover;"
                            href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/6.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:block;position:absolute;top:29.1%;left:55.6%;width:15%;height:20.9%;object-fit:cover;"
                            href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/7.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a data-style="display:block;position:absolute;top:28%;left:30.7%;width:15.4%;height:21.4%;object-fit:cover;"
                            href="javascript:;">
                            <img class="img-fluid" src="images/classic/1/8.jpg" alt="">
                        </a>
                    </li>
                </ul>
                <div class="img-prv">
                    <div class="img-wrapper">
                        <!-- <img class="uploaded-img img-fluid mx-auto" src="images/sample.jpg" alt=""> -->
                        <img class="uploaded-img img-fluid mx-auto d-none" src="" alt="">
                        <img class="frame-img img-fluid mx-auto" src="images/classic/1/1.jpg" alt="">
                        <h5>wood mount</h5>
                    </div>
                </div>
                <div class="img-panel">
                    <div class="head">
                        <div>
                            <h3>my photo</h3>
                            <div class="reviews">
                                <ul class="review-stars">
                                    <li><i class="fa-solid fa-star"></i></li>
                                    <li><i class="fa-solid fa-star"></i></li>
                                    <li><i class="fa-solid fa-star"></i></li>
                                    <li><i class="fa-solid fa-star"></i></li>
                                    <li><i class="fa-solid fa-star-half-stroke"></i></li>
                                </ul>
                                <span>4.5 stars (49k+)</span>
                            </div>
                        </div>
                        <a href="javascript:;" class="like-btn"><i class="fa-light fa-heart"></i></a>
                    </div>
                    <div class="body">
                        <div class="tabs-work">
                            <ul class="tabs-btn">
                                <li><a data-filter="frame-tab" class="active" href="javascript:;">shop frame</a></li>
                                <li><a data-filter="canvas-tab" href="javascript:;">shop canvas</a></li>
                                <li><a data-filter="speciality-tab" href="javascript:;">shop speciality</a></li>
                            </ul>
                            <div class="tabs-content">
                                <div class="tab-item frame-tab active-tab">
                                    <h4>choose print size</h4>
                                    <ul class="select-size">
                                        <li>
                                            <input type="radio" name="size-frame" id="size1" checked>
                                            <label for="size1">10" X 15"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-frame" id="size2">
                                            <label for="size2">16" X 24"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-frame" id="size3">
                                            <label for="size3">20" X 30"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-frame" id="size4">
                                            <label for="size4">24" X 36"</label>
                                        </li>
                                    </ul>
                                    <span class="finished-size">FINISHED SIZE: 32" X 44"</span>
                                    <span class="frame-h">select a frame option</span>
                                    <div class="frames-wrapper">
                                        <ul class="frame-type">
                                            <li><a data-frameId="classic-1" class="active" href="javascript:;"><img
                                                        class="img-fluid" src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li><a data-frameId="classic-2" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/2/1.jpg" alt=""></a></li>
                                            <li><a data-frameId="classic-3" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li class="frame-info">
                                                <span class="cate-type">CLASSIC FRAMEⓘ</span>
                                                <span class="price">$149</span>
                                            </li>
                                        </ul>
                                        <ul class="frame-type">
                                            <li><a data-frameId="premium-1" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li><a data-frameId="premium-2" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li><a data-frameId="premium-3" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li class="frame-info">
                                                <span class="cate-type">PREMIUM FRAMEⓘ</span>
                                                <span class="price">$200</span>
                                            </li>
                                        </ul>
                                        <ul class="frame-type">
                                            <li><a data-frameId="signature-1" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li><a data-frameId="signature-2" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li><a data-frameId="signature-3" href="javascript:;"><img class="img-fluid"
                                                        src="images/classic/1/1.jpg" alt=""></a></li>
                                            <li class="frame-info">
                                                <span class="cate-type">SIGNATURE FRAMEⓘ</span>
                                                <span class="price">$270</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <a class="see-more-frame" href="javascript:;">See more frame options ❯</a>
                                </div>
                                <div class="tab-item canvas-tab">
                                    <h4>UNFRAMED CANVAS SIZE</h4>
                                    <ul class="select-size">
                                        <li>
                                            <input type="radio" name="size-canvas" id="size21" checked>
                                            <label for="size21">10" X 15"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-canvas" id="size22">
                                            <label for="size22">16" X 24"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-canvas" id="size23">
                                            <label for="size23">20" X 30"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-canvas" id="size24">
                                            <label for="size24">24" X 36"</label>
                                        </li>
                                    </ul>
                                    <span class="finished-size">FINISHED SIZE: 32" X 44"</span>
                                    <div class="canvas-item">
                                        <img class="img-fluid" src="images/classic/1/1.jpg" alt="">
                                        <p>Our canvas is professionally hand-stretched and layered with protective ink
                                            for a museum-grade finish.</p>
                                        <div class="canvas-info">
                                            <span class="cate-type">CLASSIC canvas</span>
                                            <span class="price">$149</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-item speciality-tab">
                                    <h4>CHOOSE PRINT SIZE</h4>
                                    <ul class="select-size">
                                        <li>
                                            <input type="radio" name="size-speciality" id="size31">
                                            <label for="size31">10" X 15"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-speciality" id="size32">
                                            <label for="size32">16" X 24"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-speciality" id="size33">
                                            <label for="size33">20" X 30"</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="size-speciality" id="size34">
                                            <label for="size34">24" X 36"</label>
                                        </li>
                                    </ul>
                                    <span class="finished-size">FINISHED SIZE: 32" X 44"</span>
                                    <div class="canvas-item">
                                        <img class="img-fluid" src="images/classic/1/1.jpg" alt="">
                                        <p>Permanently bonding an image to a thick piece of hardboard and adding a
                                            protective laminate creates this mounted print. </p>
                                        <div class="canvas-info">
                                            <span class="cate-type">wood mount</span>
                                            <span class="price">$129</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-info-wrapper">
                    <div class="cart-info">
                        <h3>$129</h3>
                        <button class="add-cart">add to cart</button>
                        <span class="or">OR</span>
                        <p><img src="images/affirm.png" alt=""> As low as $13/mo or 0% APR with<a
                                href="javascript:;">Prequalify now</a></p>
                        <ul class="cart-bottom">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="63" height="42" viewBox="0 0 63 42">
                                    <path fill="#747474" fill-rule="nonzero" stroke="none" stroke-width="1"
                                        d="M37 0v6h12v.181L49.358 6l2.629 6h.218l2.113 5.293L63 20.35l-.193.654.193.002L62.918 35H63v2h-7.174a6.5 6.5 0 11.155-2h5.025l.078-13.503L53.994 19H42v-7h8.327l-1.752-4H37v19H2v8h5.019a6.5 6.5 0 11.155 2H0V0h37zM13.5 30.576a4.924 4.924 0 100 9.848 4.924 4.924 0 000-9.848zm36 0a4.924 4.924 0 100 9.848 4.924 4.924 0 000-9.848zM40 34v2H22v-2h18zM35.431 1.55H1.57L1.568 25H2v.449h33.431V8H33V6h2.431V1.55zm15.565 11.977h-7.42v3.946H52.7l-1-2.503-.058.03-.646-1.473z">
                                    </path>
                                </svg>
                                <span>FREE SHIPPING</span>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="40" viewBox="0 0 43 40">
                                    <g fill="none" fill-rule="evenodd" stroke="#747474" stroke-width="2"
                                        transform="translate(1 1)">
                                        <path
                                            d="M28.84 0c6.903 0 11.452 5.66 11.452 12.564 0 2.396-.61 4.634-1.694 6.536-2.871 6.544-9.082 12.637-18.631 18.28h0C10.357 31.7 4.243 25.566 1.625 18.974.584 17.1 0 14.908 0 12.564 0 5.66 4.549 0 11.453 0c3.676 0 6.684 1.605 8.694 4.148C22.155 1.605 25.163 0 28.839 0z">
                                        </path>
                                        <circle cx="13" cy="14" r="3"></circle>
                                        <circle cx="27" cy="14" r="3"></circle>
                                        <path d="M14.625 23.784c3.57 3.48 7.128 3.48 10.676 0"></path>
                                    </g>
                                </svg>
                                <span>FREE RETURNS</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<?php
include 'includes/footer.php';
$page = 'home';
?>