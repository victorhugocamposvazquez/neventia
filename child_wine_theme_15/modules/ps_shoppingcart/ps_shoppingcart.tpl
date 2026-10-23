{**
 * wine_theme_15 — mini-carrito lateral (popup-cart-content)
 * Restaurado desde FieldThemes demo15 + desglose recargo de equivalencia.
 *}
<div id="popup-cart-content">
  <h4>{l s='Cart' d='Shop.Theme.Actions'}</h4>

  {if $cart.products_count > 0}
    <div class="box-item">
      {foreach from=$cart.products item=product}
        <div class="cart-item-product">
          {if $product.default_image}
            <a href="{$product.url}" class="thumbnail product-thumbnail">
              <img class="img-responsive"
                   src="{$product.default_image.bySize.cart_default.url}"
                   alt="{$product.name|escape:'html':'UTF-8'}"
                   data-full-size-image-url="{$product.default_image.bySize.large_default.url}"
                   width="{$product.default_image.bySize.cart_default.width}"
                   height="{$product.default_image.bySize.cart_default.height}" />
            </a>
          {/if}
          <div class="cart-item-product-right">
            <div class="product-name-ajax">
              <span class="qtt-ajax">{$product.quantity} x </span>
              <h6 class="productName">
                <a href="{$product.url}">{$product.name|escape:'html':'UTF-8'}</a>
              </h6>
            </div>
            <div class="product-line-info-top">
              <span class="value price">{$product.price}</span>
              {l s='/Item' d='Shop.Theme.Checkout'}
            </div>
            {foreach from=$product.attributes item="property_value" key="property"}
              <div class="product-line-info-top">
                <span class="label-top">{$property|escape:'html':'UTF-8'}:</span>
                <span class="value-top">{$property_value|escape:'html':'UTF-8'}</span>
                <div class="clearfix"></div>
              </div>
            {/foreach}
          </div>
          <div class="remove-product">
            <a class="remove-from-cart"
               rel="nofollow"
               href="{$product.remove_from_cart_url}"
               data-link-action="delete-from-cart"
               data-id-product="{$product.id_product}"
               data-id-product-attribute="{$product.id_product_attribute}"
               data-id-customization="{$product.id_customization}">
              <i class="fa fa-times-circle"></i>
            </a>
          </div>
        </div>
      {/foreach}
    </div>

    <div class="card-block-top">
      <div class="totals-top">
        <span class="label-top pull-left">
          <span class="count-item-product">{$cart.products_count} </span>{l s='item(s)' d='Shop.Theme.Checkout'}
        </span>
        <span class="value-top price pull-right total_top_products">
          {$cart.subtotals.products.value}
        </span>
        <div class="clearfix"></div>
      </div>

      {if isset($cart.subtotals.shipping.value) && $cart.subtotals.shipping.value|count_characters > 0}
        <div class="totals-top">
          <span class="label-top pull-left">{$cart.subtotals.shipping.label}</span>
          <span class="value-top price pull-right">{$cart.subtotals.shipping.value}</span>
          <div class="clearfix"></div>
        </div>
      {/if}

      {include file='module:recargoequivalencia/views/templates/hook/receq-subtotals.tpl' cart=$cart}
      <div class="clearfix"></div>
    </div>

    <div class="dropdown-divider"></div>

    <div class="total-cart">
      <div class="clearfix"></div>
      {if !$configuration.display_prices_tax_incl && $configuration.taxes_enabled}
        <div class="totals-top">
          <span class="label-top pull-left">{$cart.totals.total.label}&nbsp;{if $configuration.display_taxes_label}{$cart.labels.tax_short}{/if}</span>&nbsp;
          <span class="value-top price pull-right">{$cart.totals.total.value}</span>
        </div>
        <div class="totals-top">
          <span class="label-top pull-left">{$cart.totals.total_including_tax.label}</span>&nbsp;
          <span class="value-top price pull-right">{$cart.totals.total_including_tax.value}</span>
        </div>
      {else}
        <div class="totals-top">
          <span class="label-top pull-left">
            {$cart.totals.total.label}{if $configuration.taxes_enabled && $configuration.display_taxes_label}&nbsp;{$cart.labels.tax_short}{/if}
          </span>&nbsp;
          <span class="value-top price pull-right">{$cart.totals.total.value}</span>
        </div>
      {/if}

      {if isset($cart.subtotals.tax.value) && $cart.subtotals.tax.value|count_characters > 0}
        <div class="totals-top">
          <span class="value-top tax pull-left">{$cart.subtotals.tax.label}:</span>
          <span class="value-top price pull-right">{$cart.subtotals.tax.value}</span>
        </div>
      {/if}

      <div class="clearfix"></div>
    </div>

    <div class="dropdown-divider"></div>

    <div class="buttom-checkout">
      <a href="{$cart_url}" class="view-cart">
        {l s='View cart' d='Shop.Theme.Actions'}<i class="fa fa-angle-right" aria-hidden="true"></i>
      </a>
    </div>
  {else}
    <div class="card-block-top no-product" style="border-top:none">
      {l s='There are no more items in your cart' d='Shop.Theme.Checkout'}
    </div>
    <div class="totals-top no-product-price">
      <span class="label-top total pull-left">{l s='Total:' d='Shop.Theme.Checkout'}</span>
      <span class="value-top price pull-right">
        {if isset($cart.totals.total.value)}{$cart.totals.total.value}{else}0{/if}
      </span>
      <div class="clearfix"></div>
    </div>
  {/if}
</div>
