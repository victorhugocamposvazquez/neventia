{**
 * Desglose IVA + recargo — markup wine_theme_15 (totals-top)
 *}
{if isset($cart.receq_breakdown) && $cart.receq_breakdown|@count > 0}
  {foreach from=$cart.receq_breakdown item=line}
    <div class="totals-top receq-tax-line" id="cart-subtotal-receq-{$line@index}">
      <span class="label-top pull-left">{$line.name|escape:'html':'UTF-8'}</span>
      <span class="value-top price pull-right">{$line.amount_formatted nofilter}</span>
      <div class="clearfix"></div>
    </div>
  {/foreach}
{else}
  {foreach from=$cart.subtotals item="subtotal"}
    {if isset($subtotal.type) && $subtotal.type == 'receq' && isset($subtotal.label)}
      <div class="totals-top receq-tax-line" id="cart-subtotal-{$subtotal.type}-{$subtotal@index}">
        <span class="label-top pull-left">{$subtotal.label|escape:'html':'UTF-8'}</span>
        <span class="value-top price pull-right">{$subtotal.value|default:$subtotal.amount nofilter}</span>
        <div class="clearfix"></div>
      </div>
    {/if}
  {/foreach}
{/if}
