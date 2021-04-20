define([
    'uiComponent',
    'ko',
    'jquery',
    'mage/storage',
    'mage/url',
    'mage/validation'
], function (Component, ko, $, storage, url) {
    url.setBaseUrl(window.BASE_URL);
    return Component.extend({
        defaults: {
            titulo: '',
            contenido: '',
            email: '',
            image: '',
            imageBase64: '',
            imageType: '',
            blogs: [],
            blogsUrl: 'rest/V1/blogs?searchCriteria',
            blogPostUrl: 'rest/V1/blogs'
        },
        initialize: function () {
            this._super();
            this.getBlogs();
            this.titulo.subscribe(function (value) {
                console.log(value)
            });
            var blogs1 = "/rest/V1/blogs?searchCriteria";
            $.ajax({
                url: blogs1
            }).done(function (response) {
                console.log(response);
            });
            return this;
        },
        initObservable: function () {
            this._super()
                .observe([
                    'titulo',
                    'contenido',
                    'email',
                    'image',
                    'imageBase64',
                    'imageType'
                ])
                .observe({
                    blogs: []
                });

            return this;
        },
        isFormValid: function (form) {
            return $(form).validation() && $(form).validation('isValid');
        },
        changeImage: function (data, event) {
            var image = event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = $.proxy(function (e) {
                var base64 = reader.result;
                this.imageBase64(base64.split(',', 2)[1]);
                this.imageType(base64.split(';', 2)[0].split(':', 2)[1]);
                /* var base64 = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "") */
                //this.imageBase64(base64);
            }, this);
        },
        sendBlog: function (form) {
            if (!this.isFormValid(form)) {
                return;
            }
            var blog = {
                'blog': {
                    "title": this.titulo(),
                    "email": this.email(),
                    "content": this.contenido(),
                    "img": "",
                    "extension_attributes": {
                        "image": {
                            "name": "prueba_imagen.png",
                            "base64_encoded_data": this.imageBase64(),
                            "type": this.imageType()
                        }
                    }
                }
            };
            console.log(blog);
            storage.post(this.blogPostUrl, JSON.stringify(blog))
                .then($.proxy(function () {
                    this.getBlogs();
                }, this));
            this.titulo('');
            this.contenido('');
            this.email('');
        },
        getBlogs: function () {
            storage.get(this.blogsUrl)
                .then($.proxy(function (data) {
                    this.blogs(data.items);
                }, this));
        }
    });
});