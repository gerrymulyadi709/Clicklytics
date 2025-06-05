import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";

actor Clicklytics {

  type ButtonId = Text;

  private stable var clickMap : HashMap.HashMap<ButtonId, Nat> = 
    HashMap.HashMap<ButtonId, Nat>(10, Nat.equal, Hash.hash);

  public func recordClick(buttonId : ButtonId) : async Nat {
    let oldCount = switch (clickMap.get(buttonId)) {
      case (?count) count;
      case null 0;
    };
    let newCount = oldCount + 1;
    clickMap.put(buttonId, newCount);
    return newCount;
  };

  public query func getClicks(buttonId : ButtonId) : async Nat {
    switch (clickMap.get(buttonId)) {
      case (?count) count;
      case null 0;
    }
  };

  public query func getAllClicks() : async [(ButtonId, Nat)] {
    Iter.toArray(Iter.map(clickMap.entries(), func (entry) { entry }))
  };

  system func preupgrade() {
    // persist data logic if needed
  };

  system func postupgrade() {
    // reload data logic if needed
  };
};
