
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='clients')
router.register(r'invoices', InvoiceViewSet, basename='invoices')
router.register(r'payments', PaymentViewSet,basename='payments')
router.register(r'business-profiles', BusinessProfileViewSet, basename='business-profiles')

urlpatterns = [
    path('', include(router.urls)),
    # path('next-invoice-number/',next_invoice_number,name='next-invoice-number'),
]


# # <------------------------------------------------------------------->>>

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import *

# router = DefaultRouter()
# router.register('clients', ClientViewSet, basename='client')
# router.register('invoices', InvoiceViewSet, basename='invoice')
# router.register('invoice-items', InvoiceItemViewSet)
# router.register('payments', PaymentViewSet)
# router.register('business-profiles', BusinessProfileViewSet, basename='business-profile')

# urlpatterns = [
#     path('', include(router.urls)),
# ]




