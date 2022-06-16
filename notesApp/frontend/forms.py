from django import forms

choice=(
    ('INCOMPLETE','Incomplete'),
    ('COMPLETE','Complete')
)
class NotesForm(forms.Form):
    id=forms.CharField(widget=forms.HiddenInput(attrs={'class':'form-control','id':'id'}), required=False, disabled=True)
    note=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'note'}), required=False)
    status=forms.ChoiceField(widget=forms.Select(attrs={'class':'form-control','id':'status'}) ,choices=choice, required=False)

class UserForm(forms.Form):
    id=forms.IntegerField(widget=forms.HiddenInput(attrs={'class':'form-control','id':'id'}), disabled=True, required=False)
    email=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'email'}), required=True, max_length=60)
    username=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'username'}), max_length=30)

    password=forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','id':'password'}), required=False)

    first_name=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'first_name'}), max_length=40,required=False)
    last_name=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'last_name'}), max_length=40,required=False)
    phonenumber=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'phonenumber'}), max_length=13,required=False)
    
    age=forms.IntegerField(widget=forms.NumberInput(attrs={'class':'form-control','id':'age'}),required=False)

    office_name=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'office_name'}),required=False)
    designation=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'designation'}),required=False)


class UserRegisterForm(forms.Form):
    email=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'email'}), required=True, max_length=60)
    username=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'username'}), max_length=30)

    password=forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','id':'password'}), required=True)