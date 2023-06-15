<script src="{{ 'hardcode-product-page.js' | asset_url }}" defer="defer"></script>
{% assign selected_variant = product.selected_or_first_available_variant %}


<div class="page-width product">
  <div class="grid grid--1-col grid--2-col-desktop">
    <div class="grid__item">

    </div>
      
    {% render 'badge-type', product:product ,varient:selected_variant %}
    <div class="grid__item">
      {% for block in section.blocks %}
        {% case block.type %}
          {% when 'text' %}
            {% if block.settings.text != blank %}
              <div>{{ block.settings.text }}</div>
            {% endif %}

          {% when 'title' %}
            <h1>{{ product.title }}</h1>

          {% when 'price' %}
            <div class="product-prices">
              <span class="product-price">{{ selected_variant.price | money_without_trailing_zeros }}</span>

              {% if selected_variant.compare_at_price > selected_variant.price %}
                <span class="product-cprice">{{ selected_variant.compare_at_price | money_without_trailing_zeros }}</span>
              {% endif %}
            </div>

            <div class="variant-quantity">
              {% if selected_variant.inventory_quantity > 0 %}
                {{ selected_variant.inventory_quantity }} in stock
              {% endif %}
            </div>

            <div class="variant-meta">
              {{ selected_variant.metafields.custom.info }}
            </div>

          {% when 'quantity' %}
            <quantity-box class="product-quantity">
              <button type="button" name="minus">-</button>
              <input type="number" name="quantity" value="1" form="AddToCartForm">
              <button type="button" name="plus">+</button>
            </quantity-box>
 
          {% when 'variant_picker' %}
            <wizaah-variants class="product-variants" data-url="{{ product.url }}" data-section="{{ section.id }}">
              {% for product_option in product.options_with_values %}
                <label>{{ product_option.name }}</label>

                <ul>
                  {% for value in product_option.values %}
                    <li>
                      <input 
                        type="radio" 
                        name="{{ product_option.name }}" 
                        value="{{ value }}" 
                        {% if product_option.selected_value == value %}checked{% endif %}
                      > 
                      <label>{{ value }}</label>
                    </li>
                  {% endfor %}
                </ul>
              {% endfor %}

              <script type="application/json">
                {{ product.variants | json }}
              </script>
            </wizaah-variants>
          {% when 'product_form' %}
            {% form 'product', product, id: 'AddToCartForm' %}
              <input type="hidden" name="id" value="{{ selected_variant.id }}" disabled>

      
              <button type="submit" name="add" class="product__form-button"
              {% if selected_variant.available == false %}disabled{% endif %}
              >
                <span>
                  {%- if selected_variant.available -%}
                    ADD TO CART
                  {%- else -%}
                    SOLD OUT
                  {%- endif -%}
                </span>
              </button>
            {% endform %}

          {% when 'description' %}
            <div class="product-description">{{ product.description }}</div>
        {% endcase %}
      {% endfor %}
    </div>
  </div>
</div>



{% schema %}
  {
    "name": "product Information",
    "blocks": [
      {
        "type": "title",
        "name": "Title",
        "limit": 1
      },
      {
        "type": "text",
        "name": "Text",
        "limit": 1,
        "settings": [
          {
            "type": "text",
            "id": "text",
            "label": "Text"
          }
        ]
      },
      {
        "type": "price",
        "name": "Price",
        "limit": 1
      },
      {
        "type": "variant_picker",
        "name": "Variant Picker",
        "limit": 1
      },
      {
        "type": "quantity",
        "name": "Quantity",
        "limit": 1
      },
      {
        "type": "product_form",
        "name": "Product form",
        "limit": 1
      },
      {
        "type": "description",
        "name": "Description",
        "limit": 1
      }
    ]
  }
{% endschema %}