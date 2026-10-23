/* global $, prestashop */

/**
 * This module exposes an extension point in the form of the `showModal` function.
 *
 * If you want to override the way the modal window is displayed, simply define:
 *
 * prestashop.blockcart = prestashop.blockcart || {};
 * prestashop.blockcart.showModal = function myOwnShowModal (modalHTML) {
 *   // your own code
 *   // please not that it is your responsibility to handle closing the modal too
 * };
 *
 * Attention: your "override" JS needs to be included **before** this file.
 * The safest way to do so is to place your "override" inside the theme's main JS file.
 *
 */

$(document).ready(function () {
    prestashop.blockcart = prestashop.blockcart || {};

    var showModal = prestashop.blockcart.showModal || function (modal) {
        var $body = $('body');
        $body.append(modal);
        $body.one('click', '#blockcart-modal', function (event) {
            if (event.target.id === 'blockcart-modal') {
                $(event.target).remove();
            }
        });
    };

    $(document).ready(function () {
        prestashop.on(
                'updateCart',
                function (event) {
                    var refreshURL = $('.blockcart').data('refresh-url');
                    var requestData = {};

                    if (event && event.reason) {
                        requestData = {
                            id_product_attribute: event.reason.idProductAttribute,
                            id_product: event.reason.idProduct,
                            action: event.reason.linkAction
                        };
                    }

                    $.post(refreshURL, requestData).then(function (resp) {
                        $('#popup-cart-content').replaceWith(resp.preview);
                        var count_product_item = $(resp.preview).find('.count-item-product').first().text();
                        var total_product = $(resp.preview).find('.total_top_products').first().text();
                        var total_product_0 = $(resp.preview).find('.value-top.price').first().text();
						if (count_product_item > 0)
                        {
                            $('.cart-products-count').text('' + count_product_item + '');
							$('.total_prcart').text(total_product);
                        } else if (count_product_item == 0) {
                            $('.cart-products-count').text('0');
                            $('.total_prcart').text(total_product_0);
                        } else {
                            $('.cart-products-count').text('0');
							$('.total_prcart').text(value_cart);
                        }

                        if (resp.modal) {
                            showModal(resp.modal);
                        }
                    }).fail(function (resp) {
                        prestashop.emit('handleError', {eventType: 'updateShoppingCart', resp: resp});
                    });
                }
        );
    });
});
