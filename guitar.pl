print_chord_progs :- generic_format(chord_prog, [_, _, _, _, _], format_chord_prog).
print_moveable_chords :- generic_format(moveable_chord, [_, _, _, _], format_moveable_chord).
print_open_chords :- generic_format(open_chord, [_, _, _], format_open_chord).
print_open_chord_progs :- generic_format(open_chord_prog, [_, _, _, _], format_open_chord_prog).

format_chord_prog(CP) :- get_filename('chord_prog', CP, FileName),
                         format('FileName: ~w~n', FileName),
                         format('Name: ~w~nKey: ~w~nProgression: ~w~nNashville: ~w~nArtist: ~w~n~n', CP).
format_moveable_chord(MC) :- format('Name: ~w~nRoot String: ~w~nFingering: ~w~nScale Pattern: ~w~n~n', MC).
format_open_chord(OC) :- format('Name: ~w~nRoot String: ~w~nFingering: ~w~n~n', OC).
format_open_chord_prog(OCP) :- format('Name: ~w~nKey: ~w~nProgression: ~w~nNashville: ~w~n~n', OCP).

get_filename(Prefix, CP, FileName) :- head(CP, FN),
                                      replace_char(" ", "_", FN, FN_),
                                      format(atom(FileName), '~w-~w.md', [Prefix, FN_]).

generic_format(Fact, Args, Formatter) :- findall(Args, apply(Fact, Args), Facts),
                                         maplist(Formatter, Facts).
head([H|_], H).

replace_item(_, _, [], []).
replace_item(O, R, [O|T], [R|T2]) :- replace_item(O, R, T, T2).
replace_item(O, R, [H|T], [H|T2]) :- dif(H,O), replace_item(O, R, T, T2).

replace_char(Original, Replacement, String, Result) :-
    atom_codes(String, SCs),
	atom_codes(Original,OCs), head(OCs, OC),
	atom_codes(Replacement,RCs), head(RCs, RC),
	replace_item(OC, RC, SCs, ResultCodes),
	atom_codes(Result, ResultCodes).

chord_prog('All Along The Watchtower','Bm','Bm,A,G,A','i,bVII,bVI,bVII','Jimi Hendrix').
chord_prog('Angel of Harlem','C','C,F','I,IV','U2').
chord_prog('Another Brick In The Wall','F','Fm,Bb','i,IV','Pink Floyd').
chord_prog('Another Girl','Ab','Ab,Gb,Ab,Db','I,bVII,I,IV','The Beatles').
chord_prog('Back In The USSR','A','A,C,D','I,bIII,IV','The Beatles').
chord_prog('Born On The Bayou','E','D,A,E7','bVII,IV,I','Creedence Clearwater Revival').
chord_prog('Creep','G','G,Bb,C,Cm','I,III,IV,iv','Radiohead').
chord_prog('Desire','E','D,A,E','bVII,IV,I','U2').
chord_prog('Every Breath You Take','Ab','Ab,F,Db,Eb','I,vi,IV,V','Police').
chord_prog('Hard Day''s Night','G','G,C,G,F,G','I,IV,I,bVII,I','The Beatles').
chord_prog('Heart of Gold','C','Cm,Ab,Bb,Eb','i,bVI,bVII,bIII','Neil Young').
chord_prog('Hey Joe','E','C,G,D,A,E','bVI,bIII,bVII,IV,I','Jimi Hendrix').
chord_prog('High and Dry','E','F#m,A,E','ii,IV,I','Radiohead').
chord_prog('Imagine','C','C,F','I,IV','John Lennon').
chord_prog('Instant Karma','C','C,Am','I,vi','John Lennon').
chord_prog('Knockin'' On Heaven''s Door','C','C,G,Dm','I,V,ii','Bob Dylan').
chord_prog('Lady Madonna','A','F,G,A','bVI,bVII,I','The Beatles').
chord_prog('Losing My Religion','A','Am,Em','i,v','R.E.M.').
chord_prog('Magical Mystery Tour','E','E,G,A','I,bIII,IV','The Beatles').
chord_prog('Message In a Bottle','C#','C#m,A,B,F#m','i,bVI,bVII,iv','Police').
chord_prog('My Girl','C','C,G','I,IV','The Temptations').
chord_prog('My Sharona','G','G,C,Bb','I,IV,bIII','The Knack').
chord_prog('Oye Como Va','A','Am,D','i,IV','Santana').
chord_prog('Spirits In The Material World','A','Am,G,Em','i,bVII,v','Police').
chord_prog('Tomorrow Never Knows','C','C,Bb','I,bVII','The Beatles').
chord_prog('Whole Lotta Love','E','E,D','I,bVII','Led Zeppelin').
chord_prog('With Or Without You','D','D,A,Bm,G','I,V,vi,IV','U2').
moveable_chord('A','6','5X765X','II').
moveable_chord('A13','6','5X567X','II').
moveable_chord('A6','6','5X465X','II').
moveable_chord('A6/9','6','5X445X','II').
moveable_chord('A7#5','6','5X566X','II').
moveable_chord('A7','6','5X565X','II').
moveable_chord('AMaj7','6','5X665X','II').
moveable_chord('Adim7','6','5X554X','I').
moveable_chord('Am','6','5XX555','I').
moveable_chord('Am7','6','undefined','I').
moveable_chord('Am7b5','6','5X554X','I').
moveable_chord('D','5','X5777X','V').
moveable_chord('D6/9','5','X5445X','V').
moveable_chord('D7','5','X5757X','V').
moveable_chord('D7b9','5','X5454X','undefined').
moveable_chord('D9','5','X5455X','V').
moveable_chord('DMaj7','5','X5767X','V').
moveable_chord('Ddim7','5','X5646X','IV').
moveable_chord('Dm','5','X57765','IV').
moveable_chord('Dm7','5','X57565','IV').
moveable_chord('Dm7b5','5','X5656X','undefined').
open_chord('A','5','X02220').
open_chord('A+','5','X03221').
open_chord('A6','5','X02222').
open_chord('A7','5','X02020').
open_chord('A7sus','5','X02030').
open_chord('A9','5','X02000').
open_chord('AMaj7','5','X02120').
open_chord('Aadd9','5','X02200').
open_chord('Am','5','X02210').
open_chord('Am6','5','X02212').
open_chord('Am7','5','X02010').
open_chord('Asus','5','X02230').
open_chord('B7','5','X21202').
open_chord('Bb°','5','X12020').
open_chord('C','5','X32010').
open_chord('C6','5','X32210').
open_chord('C7','5','X32310').
open_chord('C9','5','X32330').
open_chord('Cadd9','5','X32030').
open_chord('Cmaj7','5','X32000').
open_chord('D','4','XX0232').
open_chord('D+','4','XX0332').
open_chord('D6','4','XX0202').
open_chord('D7','4','XX0212').
open_chord('D7sus','4','XX0213').
open_chord('D9','4','XX0210').
open_chord('Dadd9','4','XX0230').
open_chord('Dm','4','XX0231').
open_chord('Dm6','4','XX0201').
open_chord('Dm7','4','XX0211').
open_chord('Dmaj7','4','XX0222').
open_chord('Dsus','4','XX0233').
open_chord('D°','4','XX0101').
open_chord('E','6','022100').
open_chord('E+','6','032110').
open_chord('E6','6','022120').
open_chord('E7','6','020100').
open_chord('E7sus','6','020200').
open_chord('E9','6','020102').
open_chord('Eadd9','6','022102').
open_chord('Em','6','022000').
open_chord('Em6','6','022020').
open_chord('Em7','6','020000').
open_chord('Emaj7','6','021100').
open_chord('Esus','6','022200').
open_chord('Fmaj7','4','XX3210').
open_chord('G','6','320003').
open_chord('G+','6','321003').
open_chord('G6','6','320000').
open_chord('G7','6','320001').
open_chord('G7sus','6','330011').
open_chord('G9','6','3X0201').
open_chord('Gadd9','6','320203').
open_chord('Gmaj7','6','320002').
open_chord('Gsus','6','3X0013').
open_chord_prog('A A+ D Dm6','A','A,A+,D,Dm6','I,I+,IV,iv6').
open_chord_prog('A A7 D Dm','A','A,A7,D,Dm','I,V7/IV,IV,iv').
open_chord_prog('A A7 D Dm6 E7sus E7 Em7 E7','A','A,A7,D,Dm6,E7sus,E7,Em7,E7','I,I7,IV,iv6,V7sus,V7,v7,V7').
open_chord_prog('A AMaj7 Am B7 E','E','A,Amaj7,Am,B7,E','IV,IVΔ,iV,V7,I').
open_chord_prog('A C D E','A','A,C,D,E','I,bIII,IV,V').
open_chord_prog('A E+ A E7','A','A,E+,A,E7','I,V+,I,V7').
open_chord_prog('A7sus Am7 Gsus G','G','A7sus,Am7,Gsus,G','II7sus,ii7,Isus,I').
open_chord_prog('AMaj7 DMaj7 GMaj7 CMaj7','undefined','Amaj7,Dmaj7,Gmaj7,Cmaj7','undefined').
open_chord_prog('Aadd9 A9 D9 D7 Dm7 G7 Cadd9 E7','A','Aadd9,A9,D9,D7,Dm7,G7,Cadd9,E7','I,I9,IV9,IV7,ii/bVI,V7/bVI,bVIadd9,V7').
open_chord_prog('Aadd9 C9 Dm7 E','A','Aadd9,C9,Dm7,E','Iadd9,III9,iv7,V').
open_chord_prog('Am C7 Dm E7','A','Am,C7,Dm,E7','i,III7,iv,V7').
open_chord_prog('Am Dm6 E7 Am','A','Am,Dm6,E7,Am','i,iv6,V7,i').
open_chord_prog('Am7 D9 D7 Gmaj7 E9','A','Am7,D9,D7,Gmaj7,E9','i7,IV9,IV7,bVIIΔ,V9').
open_chord_prog('Asus A E7sus E7','A','Asus,A,E7sus,E7','Isus,I,V7sus,V7').
open_chord_prog('C Am Dm G','C','C,Am,Dm,G','I,vi,ii,V').
open_chord_prog('C Am7 Dm7 G7','C','C,Am7,Dm7,G7','I,vi7,ii7,V7').
open_chord_prog('C C6 Am6 E','C','C,C6,Am6,E','I,I6,vi6,III').
open_chord_prog('C Cmaj7 C6 Em7','C','C,Cmaj7,C6,Em7','I,IΔ,I6,iii').
open_chord_prog('C Cmaj7 C9 Fmaj7','F','C,Cmaj7,C9,Fmaj7','V,VΔ,V9,IΔ').
open_chord_prog('C Dm Em G A D','C','C,Dm,Em,G,A,D','I,ii,iii,V,VI,II').
open_chord_prog('C Dm G7 C','C','C,Dm,G7,C','I,ii,V7,I').
open_chord_prog('C Dm7 G7 CMaj7','C','C,Dm7,G7,Cmaj7','I,ii7,V7,IΔ').
open_chord_prog('C Dm7 G7sus G7','C','C,Dm7,G7sus,G7','I,ii7,G7sus,G7').
open_chord_prog('C FMaj7 Em A7 D','D','C,Fmaj7,Em,A7,D','bVII,bIIIΔ,ii,V7,I').
open_chord_prog('C G Am Em Dm E7 Am7 G7','C','C,G,Am,Em,Dm,E7,Am7,G7','I,V,vi,iii,ii,V7/vi,vi7,V7').
open_chord_prog('C G D E G A','D','C,G,D,E,G,A','bVII,IV,I,II,IV,V').
open_chord_prog('Cadd9 C Esus E','C','Cadd9,C,Esus,E','Iadd9,I,IIIsus,III').
open_chord_prog('Cadd9 Em7 A7 Dm6 G9','C','Cadd9,Em7,A7,Dm6,G9','Iadd9,iii7,VI7,ii6,V9').
open_chord_prog('D D+ D6 D7','undefined','D,D+,D6,D7','undefined').
open_chord_prog('D DMaj7 D7 D6','undefined','D,Dmaj7,D7,D6','undefined').
open_chord_prog('D Dsus A7sus A7','D','D,Dsus,A7sus,A7','I,Isus,V7sus,V7').
open_chord_prog('D E7 G7 A7','D','D,E7,G7,A7','I,II7,IV7,V7').
open_chord_prog('D G C A','D','D,G,C,A','I,IV,bVII,V').
open_chord_prog('E A B7 E','E','E,A,B7,E','I,IV,V7,I').
open_chord_prog('E A E D','E','E,A,E,D','I,IV,I,bVII').
open_chord_prog('E AMaj7 EMaj7 A7 DMaj7 G6 CMaj7 B7','E','E,Amaj7,Emaj7,A7,Dmaj7,G6,Cmaj7,B7','I,IVΔ,IΔ,V7/ii,IIΔ,V6/bVI,bVIΔ,V7').
open_chord_prog('E E6 E7 A6','A','E,E6,E7,A6','V,V6,V7,I6').
open_chord_prog('E EMaj7 E7 A','A','E,Emaj7,E7,A','V,VΔ,V7,I').
open_chord_prog('E6 A6 D6 G6','undefined','E6,A6,D6,G6','undefined').
open_chord_prog('E6 A6 Dm6 E6','E','E6,A6,Dm6,E6','I6,IV6,bvii6,I6').
open_chord_prog('E6 G6 A7 B7','E','E6,G6,A7,B7','I6,III6,IV7,V7').
open_chord_prog('E9 A9 A7 Dadd9 D G','G','E9,A9,A7,Dadd9,D,G','VI9,II9,II7,Vadd9,V,I').
open_chord_prog('Em A D E','E','Em,A,D,E','i,IV,bVII,I').
open_chord_prog('Em A7 D7sus D7','D','Em,A7,D7sus,D7','ii,V7,I7sus,I7').
open_chord_prog('Em Am B7 Em','E','Em,Am,B7,Em','i,iv,V7,i').
open_chord_prog('Em C Em6 C','C','Em,C,Em6,C','iii,I,iii6,I').
open_chord_prog('Em G Am C','E','Em,G,Am,C','i,III,iv,VII').
open_chord_prog('Em6 Am6 Em D6','E','Em6,Am6,Em,D6','i6,iv6,i,bVII').
open_chord_prog('Em7 A7 Dm7 E7','D','Em7,A7,Dm7,E7','ii7,V7,i7,II7').
open_chord_prog('Em7 Am7 Dm7 Am7','A','Em7,Am7,Dm7,Am7','v7,i7,iv7,i7').
open_chord_prog('G C D Am D E','G','G,C,D,Am,D,E','I,IV,V,ii,V,VI').
open_chord_prog('G E A C G','G','G,E,A,C,G','I,VI,II,IV,I').
open_chord_prog('G E7 A7 D7','G','G,E7,A7,D7','I,V7/ii,V7/V,V7').
open_chord_prog('G Em Am D7','G','G,Em,Am,D7','I,vi,ii,V7').
open_chord_prog('G G+ E7sus E7','G','G,G+,E7sus,E7','I,I+,VI7sus,VI7').
open_chord_prog('Gadd9 Eadd9 Aadd9 Dadd9','G','Gadd9,Eadd9,Aadd9,Dadd9','Iadd9,Vadd9/ii,Vadd9/V,Vadd9').

