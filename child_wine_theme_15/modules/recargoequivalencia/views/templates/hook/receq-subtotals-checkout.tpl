{**
 * Desglose IVA + recargo — checkout / carrito (cart-summary-line)
 *}
{if isset($cart.receq_breakdown) && $cart.receq_breakdown|@count > 0}
  {foreach from=$cart.receq_breakdown item=line}
    <div class="cart-summary-line receq-tax-line" id="cart-subtotal-receq-{$line@index}">
      <span class="label receq-tax-label">{$line.name|escape:'html':'UTF-8'}</span>
      <span class="value receq-tax-amount">{$line.amount_formatted nofilter}</span>
    </div>
  {/foreach}
{else}
  {foreach from=$cart.subtotals item="subtotal"}
    {if isset($subtotal.type) && $subtotal.type == 'receq' && isset($subtotal.label)}
      <div class="cart-summary-line receq-tax-line" id="cart-subtotal-{$subtotal.type}-{$subtotal@index}">
        <span class="label receq-tax-label">{$subtotal.label|escape:'html':'UTF-8'}</span>
        <span class="value receq-tax-amount">{$subtotal.value|default:$subtotal.amount nofilter}</span>
      </div>
    {/if}
  {/foreach}
{/if}
