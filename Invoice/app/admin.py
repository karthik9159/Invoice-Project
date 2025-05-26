
from django.contrib import admin
from .models import *

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'company_name', 'user')
    search_fields = ('name', 'email', 'company_name')
    list_filter = ('user',)

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'client', 'user', 'issue_date', 'due_date', 'total', 'amount_paid', 'balance','payment_status')
    search_fields = ('invoice_number', 'client__name')
    list_filter = ('user', 'issue_date', 'due_date','payment_status')
    readonly_fields = ('amount_paid', 'balance','payment_status','invoice_number')

    def amount_paid(self, obj):
        return obj.amount_paid
    amount_paid.short_description = 'Amount Paid'

    def balance(self, obj):
        return obj.balance
    balance.short_description = 'Balance'

@admin.register(InvoiceItem)
class InvoiceItemAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'description', 'quantity', 'rate', 'amount')
    search_fields = ('description', 'invoice__invoice_number')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'client', 'amount_paid') 
    search_fields = ('invoice__invoice_number',)

@admin.register(BusinessProfile)
class BusinessProfileAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'user', 'tax_id',  'email', 'phone', 'website', 'address')
    search_fields = ('business_name', 'tax_id')

