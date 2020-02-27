const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

const S = (selector) => {
    return document.querySelectorAll(selector);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

const on = (event, elements, callback) => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => {
            one.addEventListener(event, e => callback(e, current = one));
        })
    } else if(typeof elements == "object") {
        elements.forEach(one => {
            one.addEventListener(event, e => callback(e, current = one));
        });
    }
}

const addClass = (elements, myclass = '') => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => one.classList.add(myclass));
    } else if(typeof elements == "object") {
        elements.forEach(one => one.classList.add(myclass));
    }
}


const removeClass = (elements, myclass = '') => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => one.classList.remove(myclass));
    } else if(typeof elements == "object") {
        elements.forEach(one => one.classList.remove(myclass));
    }
}

const toggleClass = (elements, myclass = '') => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => one.classList.toggle(myclass));
    } else if(typeof elements == "object") {
        elements.forEach(one => one.classList.toggle(myclass));
    }
}

const PTSansObserver = new FontFaceObserver('PT Sans');

Promise.all([
    PTSansObserver.load()
]).then(() => {
    document.querySelector('html').classList.add('fonts-loaded');
});

ready(() => {
    const MenuClassToggler = () => {
        const btn = document.querySelector('.navbar .toggle-btn');
        const menu = document.querySelector('.navbar .menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            btn.classList.toggle('active');
            document.querySelector('body').classList.toggle('overhidden');
        });
    }

    const menuClose = () => {
        const btn = document.querySelector('.navbar .toggle-btn');
        const menu = document.querySelector('.navbar .menu');
        console.log('asdf')

        menu.classList.remove('active');
        btn.classList.remove('active');
        document.querySelector('body').classList.remove('overhidden');
    }

    MenuClassToggler();

    let scrollToAnchor = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                menuClose();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    scrollToAnchor();
});

ready(() => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if(scrollY > 50) navbar.classList.add('scrolled');
        else if (scrollY < 50) navbar.classList.remove('scrolled');
    });

    if(scrollY > 50) navbar.classList.add('scrolled');
    else if (scrollY < 50) navbar.classList.remove('scrolled');
});

// Init Header Swiper
ready(() => {
    let mySwiper = new Swiper('.swiper-container.header', {
        autoplay: {
            delay: 5000
        },
        loop: true,
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    let partners = new Swiper('.swiper-container.partners-slider', {
        autoplay: {
            delay: 2000
        },
        loop: true,
        slidesPerView: 3,
        breakpoints: {
            768: {
              slidesPerView: 2,
            },
            520: {
              slidesPerView: 1,
            }
          }
    });
});

ready(() => {
    let offset = 1;
    setInterval(() => {
        offset--;
        document.querySelector('#swiper-slider-style').innerHTML = `header .swiper-wrapper::before {
            background-position-x: ${offset}px;
        }`
    } ,30);
});

ready(() => {
    const parallaxDown = (el) => {
        const element = document.querySelector(el);
        let top = element.getBoundingClientRect().top + pageYOffset;

        window.addEventListener('scroll', () => {
            if(scrollY + window.innerHeight > top) {
                if(scrollY / 6 < 200) {
                    element.style.cssText = `transform: translateY(${scrollY / 6}px);`;
                }
            }
        });
    }

    parallaxDown('.page-title');
    parallaxDown('.page-desc');
});

ready(() => {
    const parallax = (el, reverse = false) => {
        let lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / 15;

        function moveBackground() {
            if(reverse) {
                x -= (lFollowX + x) * friction;
                y -= (lFollowY + y) * friction;
            } else {
                x += (lFollowX - x) * friction;
                y += (lFollowY - y) * friction;
            }

            translate = 'translate(' + x.toFixed(3) + 'px, ' + y.toFixed(3) + 'px)';


            $(el).css({
                '-webit-transform': translate,
                '-moz-transform': translate,
                'transform': translate
            });

            window.requestAnimationFrame(moveBackground);
        }

        $(window).on('mousemove click', function (e) {

            let lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            let lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;

        });

        moveBackground();
    }

    parallax('.about .block .photo img');
});


ready(() => {
    const modalToggler = (modalClass) => {
        let modal = S(modalClass),
            yesBtn = S(`${modalClass} .yes-btn`),
            noBtn = S(`${modalClass} .no-btn`);

        if(localStorage.getItem('olderThan18') === "false" || localStorage.getItem('olderThan18') == null || localStorage.getItem('olderThan18') == false) {
            addClass(modalClass, 'active');
        } else if("true") {
            removeClass(modalClass, 'active');
        }

        on('click', yesBtn, () => {
            localStorage.setItem('olderThan18', true);
            removeClass(modalClass, 'active');
        });

        on('click', noBtn, () => {
            localStorage.setItem('olderThan18', false);
            location.replace('https://google.com/');
        });
    }

    modalToggler('.modal.ageCheck');
});

// Form handling

ready(() => {
    const form = S('.form');
    on('submit', form, (e, current) => {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "send.php",
            data: $(current).serialize(),
        })
        .done(function() {
            alert('Ваша заявка принята!')
            current.reset();
        });
    })
});


ready(() => {
    const shops = [
        {
            name: 'Lavini',
            region: 'Мирзо Улугбек',
            address: 'ул. Осиё 16',
            coors: {
                latitude: 41.325328,
                longitude: 69.297832
            },
            location: 'https://yandex.uz/maps/-/CKUyE47e',
        },
        {
            name: 'Lavini',
            region: 'Мирзо Улугбек',
            address: 'ул. Буюк Ипак Йули 155',
            coors: {
                latitude: 41.329473,
                longitude: 69.346158
            },
            location: 'https://yandex.uz/maps/-/CKaczAp7',
        },
        {
            name: 'Lavini',
            region: 'Мирзо Улугбек',
            address: 'ул. Абдулла Тўқай 1Б',
            coors: {
                latitude: 41.265077,
                longitude: 69.172792
            },
            location: 'https://yandex.uz/maps/-/CKUunCY-',
        },

        {
            name: 'Lavini',
            region: 'Мирзо Улугбек',
            address: 'ул. Паркент 1',
            coors: {
                latitude: 41.318499,
                longitude: 69.318723
            },
            location: 'https://yandex.uz/maps/-/CKUuv4zg',
        },

        {
            name: 'Lavini',
            region: 'Мирзо Улугбек',
            address: 'Малая кольцевая',
            coors: {
                latitude: 41.334142,
                longitude: 69.302886
            },
            location: 'https://yandex.uz/maps/-/CKUyERyv',
        },

        {
            name: 'Lavini',
            region: 'Мирзо Улугбек',
            address: 'ул. Буюк Ипак Йули 1',
            coors: {
                latitude: 41.311811,
                longitude: 69.287551
            },
            location: 'https://yandex.uz/maps/-/CKUhfMN3',
        },

        {
            name: 'Butcoin community',
            region: 'Мирзо Улугбек',
            address: 'ул. Кары Ниязи',
            coors: {
                latitude: 41.319142,
                longitude: 69.293403
            },
            location: 'https://yandex.uz/maps/-/CKaKbWne',
        },

        {
            name: 'Lavini',
            region: 'Яшнабaдский район',
            address: 'ул. Бойкурган 1',
            coors: {
                latitude: 41.315023,
                longitude: 69.314876
            },
            location: 'https://yandex.uz/maps/-/CKUyAJPb',
        },
        {
            name: 'Vinograd',
            region: 'Яшнабaдский район',
            address: 'ул. Эльбека',
            coors: {
                latitude: 41.299798,
                longitude: 69.296447
            },
            location: 'https://yandex.com/maps/-/CKU1Q2~q',
        },
        {
            name: 'Butcoin community',
            region: 'Яшнабaдский район',
            address: 'ул. Истикбол 37а',
            coors: {
                latitude: 41.303852,
                longitude: 69.287236
            },
            location: 'https://yandex.uz/maps/-/CKaKuZPi',
        },
        {
            name: 'Butcoin community',
            region: 'Яшнабaдский район',
            address: 'Мавлоно Ниёзи 30Б',
            coors: {
                latitude: 41.314616,
                longitude: 69.325660
            },
            location: 'https://yandex.uz/maps/-/CKaKjY1w',
        },
        {
            name: 'Butcoin community',
            region: 'Яшнабaдский район',
            address: 'ул. Паркент 26a',
            coors: {
                latitude: 41.318648,
                longitude: 69.320035
            },
            location: 'https://yandex.uz/maps/-/CKaKnI-i',
        },
        {
            name: 'Lavini',
            region: 'Учтепинский район',
            address: 'ул. Катартал 4',
            coors: {
                latitude: 41.276720,
                longitude: 69.195142
            },
            location: 'https://yandex.uz/maps/-/CKUu7R-u',
        },
        {
            name: 'Lavini',
            region: 'Мирабадский район',
            address: 'ул. Мирабад 35',
            coors: {
                latitude: 41.293624,
                longitude: 69.270961
            },
            location: 'https://yandex.uz/maps/-/CKUyIMIp',
        },
        {
            name: 'Legion',
            region: 'Мирабадский район',
            address: 'ул. Фидокор 7/7A',
            coors: {
                latitude: 41.295071,
                longitude: 69.273976
            },
            location: 'https://yandex.uz/maps/-/CKUhQE1U',
        },
        {
            name: 'Прайм Тайм',
            region: 'Мирабадский район',
            address: 'Мирабадский рынок',
            coors: {
                latitude: 41.291166,
                longitude: 69.274839
            },
            location: 'https://yandex.uz/maps/-/CKUhrS24',
        },
        {
            name: 'Прайм Тайм',
            region: 'Мирабадский район',
            address: 'ул. Мирабад 27',
            coors: {
                latitude: 41.291166,
                longitude: 69.274839
            },
            location: 'https://yandex.uz/maps/-/CKUhrS24',
        },
        {
            name: 'Аср',
            region: 'Мирабадский район',
            address: 'ул. Ойбек 44',
            coors: {
                latitude: 41.291027,
                longitude: 69.282298
            },
            location: 'https://yandex.uz/maps/-/CKaKiSPC',
        },
        {
            name: 'Vinograd',
            region: 'Алмазарский район',
            address: 'ул. Олтинсой 1/2',
            coors: {
                latitude: 41.293624,
                longitude: 69.270961
            },
            location: 'https://yandex.uz/maps/-/CKUyIMIp',
        },
        {
            name: 'Butcoin community',
            region: 'Алмазарский район',
            address: 'ул. Нурафшан',
            coors: {
                latitude: 41.337663,
                longitude: 69.223299
            },
            location: 'https://yandex.uz/maps/-/CKaKnXNi',
        },
        {
            name: 'Vinograd',
            region: 'Чиланзарский район',
            address: 'ул. Мукумий 5',
            coors: {
                latitude: 41.288944,
                longitude: 69.229036
            },
            location: 'https://yandex.uz/maps/-/CKUhUJp3',
        },
    ]

    const myPromise = new Promise((resolve) => {
        const distances = [];
        shops.forEach(shop => {
            new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition((res) => {
                    const coords = {
                        latitude: res.coords.latitude.toFixed(6),
                        longitude: res.coords.longitude.toFixed(6)
                    }

                    let dist = getDistanceFromLatLonInKm(
                        coords.latitude,
                        coords.longitude,
                        shop.coors.latitude,
                        shop.coors.longitude
                    ).toFixed(3);

                    resolve(dist);
                });
            }).then(res => {
                shop.distance = res;
                const obj = shop;
                distances.push(obj);
            })
            .then(() => resolve(distances));
        });

    }).then(res => {
        console.log(res);
    });




















    on('click', S('.closest-shop'), () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((res) => {
                const coords = {
                    latitude: res.coords.latitude.toFixed(6),
                    longitude: res.coords.longitude.toFixed(6)
                }

                const distance = getDistanceFromLatLonInKm(
                    coords.latitude, coords.longitude, 41.318741, 69.296822
                ).toFixed(3);

                alert(`You're ${distance} meters away from the shop`);
            });
        } else {
            alert('Ваш браузер не поддерживает нужные технологии, пожалуйста обновите браузер!');
        }
    });
});